const WalletButton = ({ onClick }: IWalletButton) => {
  return (
    <button
      onClick={onClick}
      className='flex h-9 px-10 items-center border-[1px] border-slate-400 hover:bg-white/10 transition-all duration-150 text-white'
    >
      Login Wallet
    </button>
  );
};

export default WalletButton;
