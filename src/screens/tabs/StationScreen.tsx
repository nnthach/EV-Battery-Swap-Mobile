import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { Navigation } from "lucide-react-native";
import StationBookingBottomSheet from "../../components/StationBookingBottomSheet";
import CountdownModal from "../../components/CountdownModal";
import { Station } from "../../../types/index";

const MAP_BOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAP_BOX_ACCESS_TOKEN;

export default function StationScreen() {
  const webViewRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 47 });

  const stations: Station[] = [
    {
      id: "1",
      name: "Brewery Electric Motorcycle Repair & Co",
      address: "Jl. Mega Kuningan Barat No.3, Jakarta Selatan",
      latitude: 10.7769,
      longitude: 106.7017,
      status: "available",
      batteryCount: 8,
      openTime: "Monday, 10:00 - 21:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 2,
    },
    {
      id: "2",
      name: "District 3 Station",
      address: "123 Vo Van Tan, District 3, HCMC",
      latitude: 10.7834,
      longitude: 106.6934,
      status: "occupied",
      batteryCount: 5,
      openTime: "Monday, 08:00 - 22:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 1,
    },
  ];

  useEffect(() => {
    getCurrentLocation();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        else if (prev.minutes > 0)
          return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Permission to access location was denied"
      );
      setUserLocation([106.7017, 10.7769]);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setUserLocation([loc.coords.longitude, loc.coords.latitude]);
  };

  useEffect(() => {
    if (userLocation && webViewRef.current) {
      const timer = setTimeout(() => {
        const payload = { type: "INIT_MAP", userLocation, stations };
        webViewRef.current.postMessage(JSON.stringify(payload));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userLocation?.join(",")]);

  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [bookedStation, setBookedStation] = useState<Station | null>(null);

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "STATION_SELECTED") {
      const station = stations.find((s) => s.id === data.stationId);
      if (station) {
        if (
          showCountdownModal &&
          selectedStation &&
          station.id !== selectedStation.id
        ) {
          return;
        }
        setSelectedStation(station);
      }
    }
    if (data.type === "ROUTE_INFO") {
      setRouteInfo({
        distance: data.distance,
        duration: data.duration,
      });
    }
    if (data.type === "MAP_LOADED") {
      setIsMapLoading(false);
    }
  };
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet" />
        <style>
          body, html { margin:0; padding:0; height:100%; }
          #map { position:absolute; top:0; bottom:0; width:100%; }
          .marker {
            width: 32px; height: 32px;
            border-radius: 50%;
            background-color: #22c55e;
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          mapboxgl.accessToken = '${MAP_BOX_ACCESS_TOKEN}';
          let map, userMarker, mapLoaded = false;

          function initMap(userLocation, stations) {
            try {
              map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: userLocation,
                zoom: 10
              });

              map.on('load', function() {
                mapLoaded = true;
                console.log('Map loaded successfully');

                // User marker
                const userMarkerEl = document.createElement('div');
                userMarkerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>';
                userMarkerEl.style.fontSize = '24px';
                userMarkerEl.style.background = '#4c82e2';
                userMarkerEl.style.borderRadius = '50%';
                userMarkerEl.style.border = '2px solid white';
                userMarkerEl.style.padding = '4px';
                userMarkerEl.style.color = 'white';
                userMarkerEl.style.display = 'flex';
                userMarkerEl.style.alignItems = 'center';
                userMarkerEl.style.justifyContent = 'center';
                userMarkerEl.style.width = '32px';
                userMarkerEl.style.height = '32px';
                
                new mapboxgl.Marker(userMarkerEl)
                  .setLngLat(userLocation)
                  .addTo(map);

                // Station markers
                stations.forEach((station) => {
                  const el = document.createElement('div');
                  el.className = 'marker';
                  const isAvailable = station.status === 'available';
                  el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 7h11"/><path d="m9 11-2 3h3l-2 3"/></svg>';
                  el.style.fontSize = '20px';
                  el.style.color = 'white';
                  el.style.backgroundColor = isAvailable ? '#22c55e' : '#ef4444';
                  el.style.borderRadius = '50%';
                  el.style.padding = '6px';
                  el.style.border = '2px solid white';
                  el.style.cursor = 'pointer';
                  el.style.width = '32px';
                  el.style.height = '32px';
                  el.style.display = 'flex';
                  el.style.alignItems = 'center';
                  el.style.justifyContent = 'center';
                  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                  
                  el.addEventListener('click', () => {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'STATION_SELECTED',
                      stationId: station.id
                    }));
                  });
                  
                  new mapboxgl.Marker(el)
                    .setLngLat([station.longitude, station.latitude])
                    .addTo(map);
                });

                // Notify React Native that map has loaded
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'MAP_LOADED'
                }));
              });
              
              map.on('error', function(e) {
                console.error('Map error:', e);
              });
              
            } catch (error) {
              console.error('Error initializing map:', error);
            }
          }

          function showRoute(start, end) {
            if (!map || !mapLoaded) {
              console.error('Map not ready yet');
              return;
            }



            const url = \`https://api.mapbox.com/directions/v5/mapbox/driving/\${start[0]},\${start[1]};\${end[0]},\${end[1]}?geometries=geojson&access_token=\${mapboxgl.accessToken}\`;
            
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
              })
              .then(data => {
                console.log('Route data received:', data);
                
                if (data.routes && data.routes.length > 0) {
                  const route = data.routes[0].geometry;
                  const distance = data.routes[0].distance; // in meters
                  const duration = data.routes[0].duration; // in seconds

                  // Send route info back to React Native
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'ROUTE_INFO',
                    distance: distance,
                    duration: duration
                  }));

                  // Remove existing route if any
                  if (map.getLayer('route')) {
                    map.removeLayer('route');
                  }
                  if (map.getSource('route')) {
                    map.removeSource('route');
                  }

                  // Add route source and layer
                  map.addSource('route', {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      properties: {},
                      geometry: route
                    }
                  });

                  map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                      'line-join': 'round',
                      'line-cap': 'round'
                    },
                    paint: {
                      'line-color': '#3b82f6',
                      'line-width': 5,
                      'line-opacity': 0.8
                    }
                  });

                  // Fit map to show the entire route
                  const coordinates = route.coordinates;
                  const bounds = coordinates.reduce((bounds, coord) => {
                    return bounds.extend(coord);
                  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

                  map.fitBounds(bounds, {
                    padding: 50,
                    duration: 1000
                  });

                  console.log('Route displayed successfully');
                } else {
                  console.error('No routes found in response');
                }
              })
              .catch(error => {
                console.error('Error fetching route:', error);
              });
          }

          // Message handlers
          document.addEventListener('message', handleMessage);
          window.addEventListener('message', handleMessage);

          function handleMessage(event) {
            try {
              const data = JSON.parse(event.data);
              console.log('Received message:', data.type);
              
              if (data.type === 'INIT_MAP') {
                initMap(data.userLocation, data.stations);
              }
              
              if (data.type === 'SHOW_ROUTE') {
                showRoute(data.start, data.end);
              }
            } catch (error) {
              console.error('Error handling message:', error);
            }
          }
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white shadow-sm">
        <Text className="text-2xl font-semibold text-blue-600">amply</Text>
        <TouchableOpacity onPress={getCurrentLocation}>
          <Navigation size={24} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* WebView Mapbox */}
      <View className="h-screen">
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          onMessage={handleMessage}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView error: ", nativeEvent);
          }}
          style={{ flex: 1 }}
          onLoadEnd={() => {
            if (userLocation) {
              setTimeout(() => {
                const payload = { type: "INIT_MAP", userLocation, stations };
                webViewRef.current?.postMessage(JSON.stringify(payload));
              }, 500);
            }
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />

        {/* Loading Overlay */}
        {isMapLoading && (
          <View className="absolute inset-0 bg-white/90 items-center justify-center z-40">
            <View className="bg-white rounded-2xl p-6 shadow-lg items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-600 mt-3 font-medium">
                Đang tải bản đồ...
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Bottom Sheet */}
      <StationBookingBottomSheet
        station={selectedStation}
        userLocation={userLocation}
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
        distance={
          routeInfo ? (routeInfo.distance / 1000).toFixed(1) : undefined
        }
        duration={routeInfo ? Math.round(routeInfo.duration / 60) : undefined}
        isCountdownActive={showCountdownModal}
        onGetDirections={(station) => {
          if (userLocation && webViewRef.current) {
            const payload = {
              type: "SHOW_ROUTE",
              start: userLocation,
              end: [station.longitude, station.latitude],
            };
            webViewRef.current.postMessage(JSON.stringify(payload));
          }
        }}
        onBooking={(station) => {
          // Save booked station info and show countdown modal
          setBookedStation(station);
          setShowCountdownModal(true);
        }}
        onGoogleMap={() =>
          selectedStation &&
          userLocation &&
          Linking.openURL(
            `https://www.google.com/maps/dir/${userLocation[1]},${userLocation[0]}/${selectedStation.latitude},${selectedStation.longitude}`
          )
        }
        onClose={() => {
          setSelectedStation(null);
          setRouteInfo(null);
        }}
      />

      {/* Countdown Modal */}
      <CountdownModal
        visible={showCountdownModal}
        duration={routeInfo ? Math.round(routeInfo.duration / 60) : undefined}
        stationName={bookedStation?.name}
        onClose={() => {
          setShowCountdownModal(false);
          setBookedStation(null);
          setSelectedStation(null);
          setRouteInfo(null);
        }}
        onTimeUp={() => {
          setShowCountdownModal(false);
          setBookedStation(null);
          setSelectedStation(null);
          setRouteInfo(null);
          Alert.alert(
            "Hết thời gian!",
            "Thời gian đặt chỗ đã hết. Vui lòng đặt lại nếu cần thiết."
          );
        }}
      />
    </SafeAreaView>
  );
}
