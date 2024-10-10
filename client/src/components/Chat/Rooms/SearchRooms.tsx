import SearchIcon from "@/assets/SearchIcon";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setRoom: Dispatch<SetStateAction<string>>;
}

const SearchRooms = ({ setRoom }: IProps) => {
  return (
    <div className="relative flex items-center mt-4 mb-6">
      <div className="absolute flex items-center justify-center w-10 h-10 text-gray-400 rounded-lg left-1">
        <SearchIcon />
      </div>
      <input
        onChange={(e) => setRoom(e.target.value)}
        placeholder="search"
        className="outline-none pl-12 w-full border-transparent transition-all duration-200 ease-in px-3 h-10 focus:border-[1px] rounded-lg  focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-offset-0 dark:border-none"
      />
    </div>
  );
};

export default SearchRooms;
