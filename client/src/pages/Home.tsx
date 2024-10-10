import Messages from "@/components/Chat/Messages/Messages";
import ChatList from "@/components/Chat/Rooms/ChatList";
import Sidebar from "@/components/Chat/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="lg:max-w-[1200px] mx-auto lg:p-6 p-0">
      <div className="flex overflow-hidden z-0 lg:h-[calc(100vh-3rem)] h-screen lg:rounded-lg rounded-none">
        <div className="items-stretch">{/* <Sidebar /> */}</div>
        <div className="flex-auto bg-slate-100 dark:bg-slate-800 w-60 lg:w-40">
          {/* <ChatList /> */}
        </div>
        <div className="flex-auto hidden overflow-auto bg-blue-100 md:block w-96 dark:bg-slate-700">
          {/* <Messages /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
