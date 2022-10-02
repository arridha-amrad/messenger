import TextInput from '@comps/TextInput';
import { Link } from 'react-router-dom';
import Logo from '@assets/logo.png';
import TailwindIcon from '@assets/tailwind-icon';
import useForm from '@hooks/useForm';
import AuthNavbar from '@comps/AuthNavbar';

const Register = () => {
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
    async () => {}
  );
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col gap-2 p-8 rounded-md">
          <img src={Logo} className="mx-auto w-14 h-14" />
          <h1 className="mb-6 text-4xl text-center dark:text-slate-100">
            Register to Messenger
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
                <Link to="/" className="link underline underline-offset-2">
                  login
                </Link>
              </div>
              <div className="flex-1">
                <button type="submit" className="btn btn-special w-full">
                  Register
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

export default Register;
