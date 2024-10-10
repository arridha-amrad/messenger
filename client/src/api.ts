import { privateAxios, publicAxios } from "@/lib/axios";

type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};
export const register = async (data: RegisterDTO) => {
  return publicAxios.post("/auth/register", data);
};

export const refreshToken = async () => {
  return publicAxios.get("/auth/refresh-token");
};

export const me = async () => {
  return await privateAxios.get("/auth");
};

type LoginDTO = {
  identity: string;
  password: string;
};
export const login = async (data: LoginDTO) => {
  return publicAxios.post("/auth", data);
};
