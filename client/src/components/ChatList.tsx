import Pen from '@assets/Pen';
import ChatIcon from '@assets/ChatIcon';
import SearchIcon from '@assets/SearchIcon';

const ChatList = () => {
  const messages = 'helloworld'.split('');
  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center h-16 ">
        <h1 className="font-semibold text-4xl subpixel-antialiased">Chats</h1>
        <button>
          <Pen />
        </button>
      </div>
      <div className="mb-6 mt-4 relative flex items-center">
        <div className="absolute left-1 rounded-lg h-10 w-10 flex items-center justify-center text-gray-400">
          <SearchIcon />
        </div>
        <input
          placeholder="search"
          className="outline-none pl-12 w-full transition-all duration-200 ease-in px-3 h-10 border-gray-300 border-[1px] rounded-lg  focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-offset-0 dark:border-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <ChatIcon /> <p className="text-gray-400 font-semibold">All messages</p>
      </div>

      <div className="mt-2 overflow-auto">
        {messages.map((_, i) => (
          <div
            key={i}
            className="flex gap-2 cursor-pointer items-center hover:bg-blue-100 dark:hover:bg-indigo-700 py-1 px-2 rounded-lg"
          >
            <img
              src="https://images2.minutemediacdn.com/image/upload/c_crop,w_3592,h_2020,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_id_international_web/01ge9fd10edapeta17g3.jpg"
              alt=""
              className="w-14 h-14 my-2 border-none outline-none rounded-full bg-gray-300 object-cover"
            />
            <div className="flex-1 flex-nowrap overflow-hidden flex-col justify-start ">
              <h1 className="font-semibold">Arridha Amrad</h1>
              <p className="text-ellipsis text-gray-400 dark:text-gray-100 font-light whitespace-nowrap overflow-hidden">
                Hello World asdhas dasjkdhajs djasdhajs jashdjasdha
              </p>
            </div>
            <div className="self-start pt-2 pr-2">
              <p className="text-gray-400 dark:text-gray-100">12.15PM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
