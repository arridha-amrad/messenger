const RoomHeader = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-blue-400 md:hidden dark:bg-slate-800">
      <img
        src="https://images2.minutemediacdn.com/image/upload/c_crop,w_3592,h_2020,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_id_international_web/01ge9fd10edapeta17g3.jpg"
        className="object-cover w-12 h-12 my-2 border-none rounded-full outline-none"
        alt=""
      />
      <div className="-space-y-1">
        <h1 className="font-semibold text-white">Arridha Amrad</h1>
        <p className="text-white text-thin">Online</p>
      </div>
    </div>
  );
};

export default RoomHeader;
