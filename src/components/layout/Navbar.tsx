import WalletButton from '../Button/WalletButton';

const Navbar = () => {
  return (
    <nav className='bg-[#24292f] text-white shadow-2xl'>
      <div className='px-10 h-[64px] max-w-screen-2xl flex justify-between items-center mx-auto'>
        <span className='text-xl font-bold cursor-pointer'>HuFi Tool</span>
        <WalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
