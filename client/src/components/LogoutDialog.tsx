interface IProps {
  closeModal: VoidFunction;
  logout: VoidFunction;
  isOpen: boolean;
}

const LogoutDialog = ({ closeModal, logout }: IProps) => {
  return (
    <div className="min-w-[200px] min-h-[200px] rounded-lg flex items-center flex-col gap-3 p-4">
      <div className="mt-4">
        <h1 className="text-3xl font-bold dark:text-slate-300 text-slate-800">
          Logout
        </h1>
      </div>
      <div className="flex-1">
        <p className="text-slate-400">Are you sure you want to logout ?</p>
      </div>
      <div className="flex flex-col my-3 gap-2 ">
        <button
          className="btn hover:text-slate-600 border-none text-slate-800 dark:text-slate-200"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="btn rounded-lg bg-blue-500 hover:bg-blue-400"
          onClick={logout}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default LogoutDialog;
