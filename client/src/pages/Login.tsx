import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { SocketContext } from "@/context/SocketContext";
import useForm from "@/hooks/useForm";
import AuthNavbar from "@/components/User/AuthNavbar";
import TextInput from "@/components/Shared/TextInput";
import MySpinner from "@/components/Shared/Spinner";
import TailwindIcon from "@/assets/tailwind-icon";
import { login as api } from "@/api";
import { setToken } from "@/lib/axios";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const res = await api({
        identity,
        password,
      });
      console.log(res);
      setToken(res.data.token);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  const {
    isLoading,
    onChange,
    onSubmit,
    state: { identity, password },
  } = useForm(
    {
      identity: "",
      password: "freePalestine99",
    },
    login
  );

  return (
    <div className="flex flex-col min-h-screen gap-6">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="relative flex flex-col p-8 gap-2">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-3xl text-center sm:text-4xl dark:text-slate-100">
            Messenger
          </h1>
          {error && (
            <p className="text-red-500 text-center absolute top-[35%] left-1/2 -translate-x-1/2">
              {error}
            </p>
          )}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mt-4 md:min-w-[370px] min-w-[300px]"
          >
            <TextInput
              name="identity"
              value={identity}
              onChange={onChange}
              type={"text"}
              label="Username or email"
            />
            <TextInput
              name="password"
              value={password}
              onChange={onChange}
              type={"password"}
              label="Password"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex-1">
                <Link
                  to="/register"
                  className="underline link underline-offset-2"
                >
                  register
                </Link>
              </div>
              <div className="flex-1">
                <button type="submit" className="w-full btn btn-special">
                  {isLoading ? <MySpinner className="text-white" /> : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center py-6 shadow-inner border-t-1">
        <div className="inline mr-2 text-center">
          Crafted by : <span className="font-bold">arridha amrad</span> with
        </div>
        <TailwindIcon />
      </div>
    </div>
  );
};

export default Login;
