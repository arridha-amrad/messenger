import MenuIcon from '@assets/MenuIcon';

const RoomBurger = () => {
  return (
    <button className="absolute md:hidden top-[5%] left-4 -translate-y-1/2">
      <MenuIcon />
    </button>
  );
};

export default RoomBurger;
