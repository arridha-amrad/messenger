import { useGetUserQuery } from "@/features/user/userApiSlices";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <button className="relative w-8 h-8 rounded-full cursor-pointer group">
      <img src={user?.imageURL} className="w-full h-full rounded-full" alt="" />
      <div className="absolute p-1 rounded-lg shadow opacity-0 transition-opacity duration-300 ease-in-out top-10 -left-2 dark:bg-indigo-500 bg-slate-300 group-hover:opacity-100">
        <p className="text-sm font-medium ">{user?.username}</p>
      </div>
    </button>
  );
};

export default UserInfo;
