const ChatCard = () => {
  return (
    <div className="flex gap-2 cursor-pointer items-center hover:bg-blue-100 dark:hover:bg-indigo-700 py-1 px-2 rounded-lg">
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
      <div className="self-start pt-3 pr-2">
        <p className="text-slate-400 text-sm dark:text-gray-100">12.15PM</p>
      </div>
    </div>
  );
};

export default ChatCard;
