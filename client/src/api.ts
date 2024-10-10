import { privateAxios, publicAxios } from "@/lib/axios";

type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterDTO) => {
  return await publicAxios.post("/auth/register", data);
};

export const refreshToken = async () => {
  return await publicAxios.get("/auth/refresh-token");
};

export const me = async () => {
  return await privateAxios.get("/auth");
};
