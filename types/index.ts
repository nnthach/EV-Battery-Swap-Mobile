export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  role: string;
}

export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: "available" | "occupied" | "maintenance";
  batteryCount: number;
  openTime: string;
  image: string;
  swappableBatteries: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Form Types
export interface LoginForm {
  usernameOrEmail: string;
  password: string;
}
