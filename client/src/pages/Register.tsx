import AuthNavbar from "@/components/User/AuthNavbar";
import useForm from "@/hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import TextInput from "@/components/Shared/TextInput";
import MySpinner from "@/components/Shared/Spinner";
import TailwindIcon from "@/assets/tailwind-icon";
import { register as api } from "@/api";
import { setToken } from "@/lib/axios";

const Register = () => {
  const navigate = useNavigate();
  const register = async () => {
    const res = await api({
      email,
      password,
      username,
    });
    setToken(res.data.token);
    navigate("/", { replace: true });
  };
  const {
    isLoading,
    onChange,
    onSubmit,
    state: { email, password, username },
  } = useForm(
    {
      email: "",
      username: "",
      password: "",
    },
    register
  );
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col p-8 gap-2 rounded-md">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-3xl text-center sm:text-4xl dark:text-slate-100">
            Messenger
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col mt-4 gap-4 w-96">
            <TextInput
              name="email"
              value={email}
              onChange={onChange}
              type={"text"}
              label="Email Address"
            />
            <TextInput
              name="username"
              value={username}
              onChange={onChange}
              type={"text"}
              label="Username"
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
                <Link to="/login" className="underline link underline-offset-2">
                  login
                </Link>
              </div>
              <div className="flex-1">
                <button type="submit" className="w-full btn btn-special">
                  {isLoading ? (
                    <MySpinner className="text-white" />
                  ) : (
                    "Register"
                  )}
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

export default Register;
