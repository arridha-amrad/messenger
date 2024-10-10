import { redirect } from "react-router-dom";
import { me, refreshToken } from "./api";
import { getToken, setToken } from "./lib/axios";

export const homeLoader = async () => {
  const token = getToken();
  try {
    if (token === "") {
      const res = await refreshToken();
      setToken(res.data.token);
      const res2 = await me();
      return res2.data.user;
    }
    const res = await me();
    return res.data.user;
  } catch (err: any) {
    return redirect("/login");
  }
};
