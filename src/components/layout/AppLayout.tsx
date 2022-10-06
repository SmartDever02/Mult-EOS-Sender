import Navbar from './Navbar';

const AppLayout = ({ children }: any) => {
  return (
    <div className='w-full h-auto overflow-x-hidden'>
      <Navbar />
      {children}
    </div>
  );
};

export default AppLayout;
