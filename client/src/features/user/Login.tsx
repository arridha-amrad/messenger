import TextInput from '@comps/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@assets/logo.png';
import TailwindIcon from '@assets/tailwind-icon';
import useForm from '@hooks/useForm';
import AuthNavbar from '@comps/AuthNavbar';
import { useLoginMutation } from './userApiSlices';
import MySpinner from '@comps/Spinner';
import { useState } from 'react';
import { setToken } from '@utils/token';
import { useEffect } from 'react';

const Login = () => {
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (): Promise<void> => {
    try {
      const payload = await loginUser({ identity, password }).unwrap();
      setToken(payload.token);
      navigate('/');
    } catch (error: any) {
      setError(error.data.error);
    }
  };

  useEffect(() => {}, [isSuccess]);

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
    <div className="flex flex-col min-h-screen gap-6">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-2 p-8 relative">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-4xl text-center dark:text-slate-100">
            Login to Messenger
          </h1>
          {isError && (
            <p className="text-red-500 text-center absolute top-[35%] left-1/2 -translate-x-1/2">
              {error}
            </p>
          )}
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
                  {isLoading ? <MySpinner className="text-white" /> : 'Login'}
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
