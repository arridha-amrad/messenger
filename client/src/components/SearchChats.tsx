import SearchIcon from '@assets/SearchIcon';

const SearchChats = () => {
  return (
    <div className="mb-6 mt-4 relative flex items-center">
      <div className="absolute left-1 rounded-lg h-10 w-10 flex items-center justify-center text-gray-400">
        <SearchIcon />
      </div>
      <input
        placeholder="search"
        className="outline-none pl-12 w-full border-transparent transition-all duration-200 ease-in px-3 h-10 focus:border-[1px] rounded-lg  focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-offset-0 dark:border-none"
      />
    </div>
  );
};

export default SearchChats;
