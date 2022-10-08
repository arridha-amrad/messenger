import { Link, useNavigate } from 'react-router-dom';

import Logo from '@assets/logo.png';
import TailwindIcon from '@assets/tailwind-icon';
import MySpinner from '@comps/Shared/Spinner';
import TextInput from '@comps/Shared/TextInput';
import AuthNavbar from '@comps/User/AuthNavbar';
import useForm from '@hooks/useForm';
import { setToken } from '@utils/token';

import { useRegisterMutation } from './userApiSlices';

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const register = async () => {
    try {
      const { token } = await registerUser({
        email,
        password,
        username,
      }).unwrap();
      setToken(token);
      navigate('/');
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const {
    onChange,
    onSubmit,
    state: { email, password, username },
  } = useForm(
    {
      email: '',
      username: '',
      password: '',
    },
    register
  );
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-2 p-8 rounded-md">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-3xl text-center sm:text-4xl dark:text-slate-100">
            Messenger
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 w-96">
            <TextInput
              name="email"
              value={email}
              onChange={onChange}
              type={'text'}
              label="Email Address"
            />
            <TextInput
              name="username"
              value={username}
              onChange={onChange}
              type={'text'}
              label="username"
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
                <Link to="/login" className="underline link underline-offset-2">
                  login
                </Link>
              </div>
              <div className="flex-1">
                <button type="submit" className="w-full btn btn-special">
                  {isLoading ? (
                    <MySpinner className="text-white" />
                  ) : (
                    'Register'
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
