import { useState } from 'react';
import arrow from '../../assets/logoarrow.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogoutAndCloseDrawer = () => {
    
    dispatch(logout());
    setIsDrawerOpen(false);
    navigateToLogin()
  };



  return (
    <div className="bg-[#1752FD] p-2 flex items-center justify-between w-full text-sm font-medium leading-5 text-zinc-950">
      <div onClick={navigateToHome} className="flex items-center gap-2 cursor-pointer">
        <img
          src={require('../../assets/Trees.png')}
          alt="Tree"
          className="animate-spin w-[50px] h-[50px]"
        />
        <h1 className="text-white font-signika text-xl">Luke Tree Service</h1>
      </div>

      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <div className="hidden md:flex gap-4">
              <div onClick={() => navigate('/reviews')} className="text-white cursor-pointer p-2">Reviews</div>
              <div onClick={() => navigate('/about')} className="text-white cursor-pointer p-2">About</div>
              <div onClick={() => navigate('/review')} className="text-white cursor-pointer p-2">Write Review</div>
              <div onClick={handleLogoutAndCloseDrawer} className="flex gap-1 justify-center py-2 pr-2 pl-3 bg-white shadow rounded-[1000px] items-center cursor-pointer">
                <div>Logout</div>
                <img
                  loading="lazy"
                  src={arrow}
                  className="shrink-0 w-4 aspect-square"
                />
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={toggleDrawer} className="flex gap-1 justify-center py-2 pr-2 pl-3 bg-white shadow rounded-[1000px] items-center cursor-pointer">
                <div>Menu</div>
                <img
                  loading="lazy"
                  src={arrow}
                  className="shrink-0 w-4 aspect-square"
                />
              </button>
            </div>
          </>
        ) : (
          <div onClick={navigateToLogin} className="flex gap-1 justify-center py-2 pr-2 pl-3 bg-white shadow rounded-[1000px] items-center cursor-pointer">
            <div>Log In</div>
            <img
              loading="lazy"
              src={arrow}
              className="shrink-0 w-4 aspect-square"
            />
          </div>
        )}
      </div>

      {/* Drawer for mobile and tablet view */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full p-4 flex flex-col">
            <button onClick={toggleDrawer} className=" mb-4 flex gap-1 justify-center py-2 pr-2 pl-3 bg-blue-600 text-white shadow rounded-[1000px] items-center cursor-pointer">
              <div>Close</div>
              <img
                loading="lazy"
                src={arrow}
                className="shrink-0 w-4 aspect-square"
              />
            </button>
            <div onClick={() => { navigate('/reviews'); toggleDrawer(); }} className="text-black cursor-pointer mb-2">Reviews</div>
            <div onClick={() => { navigate('/about'); toggleDrawer(); }} className="text-black cursor-pointer mb-2">About</div>
            <div onClick={() => { navigate('/review'); toggleDrawer(); }} className="text-black cursor-pointer mb-2">Write Review</div>
            <div onClick={handleLogoutAndCloseDrawer} className="text-black cursor-pointer mb-2">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}
