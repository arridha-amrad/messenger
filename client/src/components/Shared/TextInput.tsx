import { FC, InputHTMLAttributes } from 'react';

const TextInput: FC<
  InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="subpixel-antialiased font-semibold">{label}</label>
      <input
        {...props}
        autoComplete="off"
        className="outline-none transition-all duration-200 ease-in px-3 h-10 border-gray-300 border-[1px] rounded-lg w-full focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-indigo-500 dark:border-transparent dark:ring-offset-indigo-500 dark:ring-offset-1"
      />
    </div>
  );
};

export default TextInput;
