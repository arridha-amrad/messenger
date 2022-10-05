import { useGetUserQuery } from '@features/user/userApiSlices';

const UserInfo = () => {
  const { data } = useGetUserQuery();
  return (
    <button className="cursor-pointer rounded-full w-8 h-8 relative group">
      <img src={data?.imageURL} className="w-full h-full rounded-full" alt="" />
      <div className="absolute opacity-0 transition-opacity duration-300 ease-in-out top-10 -left-2 dark:bg-indigo-500 bg-slate-300 shadow rounded-lg p-1 group-hover:opacity-100">
        <p className=" font-medium text-sm ">{data?.username}</p>
      </div>
    </button>
  );
};

export default UserInfo;
