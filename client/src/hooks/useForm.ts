import { ChangeEvent, FormEvent, useState } from 'react';

const useForm = <T>(initialState: T, execute: () => Promise<void>) => {
  const [state, setState] = useState(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await execute();
  };
  return {
    state,
    onChange,
    onSubmit,
  };
};

export default useForm;
