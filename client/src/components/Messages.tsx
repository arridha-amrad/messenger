import { useAppSelector } from '@app/hooks';
import SendMessage from '@features/chats/SendMessage';
import RoomHeader from './RoomHeader';

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
  const { selectedRoom } = useAppSelector((state) => state.chat);

  return (
    <div className="md:p-4 h-full p-2 relative overflow-x-hidden flex flex-col">
      {selectedRoom && (
        <>
          <RoomHeader />
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
        </>
      )}
    </div>
  );
};

export default Messages;
