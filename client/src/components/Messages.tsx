import MenuIcon from '@assets/MenuIcon';
import SendMessage from '@features/chats/SendMessage';

const messages = [
  { text: "Hey there! What's up", sent: true },
  { text: 'Checking out iOS7 you know..' },
  { text: 'Check out this bubble!', sent: true },
  { text: "It's pretty cool!" },
  { text: "And it's in css?" },
  { text: "Yeah it's pure CSS &amp; HTML", sent: true },
  {
    text: '(ok.. almost, I added a tiny bit of JS to remove sibling message tails)',
    sent: true,
  },
  {
    text: "Wow that's impressive. But what's even more impressive is that this bubble is really high.",
  },
];

const Messages = () => {
  return (
    <div className="md:p-4 h-full p-2 relative overflow-x-hidden flex flex-col">
      <button className="absolute md:hidden top-[5%] left-4 -translate-y-1/2">
        <MenuIcon />
      </button>
      <div className="md:hidden items-center justify-center flex-wrap gap-4 flex">
        <img
          src="https://images2.minutemediacdn.com/image/upload/c_crop,w_3592,h_2020,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_id_international_web/01ge9fd10edapeta17g3.jpg"
          className="w-12 h-12 my-2 border-none outline-none rounded-full object-cover"
          alt=""
        />
        <div className="-space-y-1">
          <h1 className="font-semibold">Arridha Amrad</h1>
          <p className="text-thin">Online</p>
        </div>
      </div>
      <div className="flex-1 md:my-2 my-6 ">
        <div className="bg-slate-300 dark:bg-slate-500 opacity-50 mx-auto w-1/2 h-[2px] relative rounded-lg mb-4">
          <p className="absolute left-1/2 -translate-x-1/2 dark:bg-slate-700 bg-blue-100 text-slate-500 dark:text-slate-400 -translate-y-1/2 px-2 font-semibold">
            Today
          </p>
        </div>

        <ul className="list">
          {messages.map(({ text, sent: isSent }, i) => {
            const isLast = i === messages.length - 1;
            const isNoTail = !isLast && messages[i + 1]?.sent === isSent;
            return (
              <li
                key={text}
                className={`shared ${isSent ? 'sent' : 'received'} ${
                  isNoTail ? 'noTail' : ''
                }`}
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
