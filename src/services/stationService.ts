import axiosClient from "@/src/config/axios";

export const getAllPublicStationListAPI = async <T>(params: T) => {
  const res = await axiosClient.get("/station/public", { params });

  return res;
};

export const getStationByIdAPI = async (id: string | number) => {
  const res = await axiosClient.get(`/station/${id}`);
  return res;
};
