const SendMessage = () => {
  return (
    <div className="w-full relative px-3">
      <button className="absolute text-white px-4 py-1 rounded-lg top-[45%] right-12 -translate-y-1/2 dark:bg-slate-700 bg-blue-200 cursor-text">
        Send
      </button>
      <textarea
        placeholder="type..."
        className="outline-none leading-4 resize-none transition-all duration-200 ease-in border border-transparent h-20 py-2 rounded-lg  focus:ring-blue-200 dark:focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 dark:focus:border-indigo-500 focus:border-blue-500 dark:focus:ring-offset-0 w-full pl-4 pr-28"
      />
    </div>
  );
};

export default SendMessage;
