import TextInput from '@comps/TextInput';
import { Link } from 'react-router-dom';
import Logo from '@assets/logo.png';
import TailwindIcon from '@assets/tailwind-icon';
import useForm from '@hooks/useForm';
import AuthNavbar from '@comps/AuthNavbar';

const Login = () => {
  const login = async () => {};
  const {
    onChange,
    onSubmit,
    state: { identity, password },
  } = useForm(
    {
      identity: '',
      password: '',
    },
    login
  );
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-2 p-8 rounded-md">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-4xl text-center dark:text-slate-100">
            Login to Messenger
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 w-96">
            <TextInput
              name="identity"
              value={identity}
              onChange={onChange}
              type={'text'}
              label="Username or email"
            />
            <TextInput
              name="password"
              value={password}
              onChange={onChange}
              type={'password'}
              label="Password"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex-1">
                <Link
                  to="/register"
                  className="link underline underline-offset-2"
                >
                  register
                </Link>
              </div>
              <div className="flex-1">
                <button type="submit" className="btn btn-special w-full">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="py-6 shadow-inner border-t-1 flex justify-center items-center">
        <div className="text-center inline mr-2">
          Crafted by : <span className="font-bold">arridha amrad</span> with
        </div>
        <TailwindIcon />
      </div>
    </div>
  );
};

export default Login;
