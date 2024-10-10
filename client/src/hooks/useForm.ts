import { ChangeEvent, FormEvent, useState } from "react";

const useForm = <T>(initialState: T, execute: () => Promise<void>) => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await execute();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    state,
    isLoading,
    setState,
    onChange,
    onSubmit,
  };
};

export default useForm;
