import arrow from '../../assets/logoarrow.svg'
import { useNavigate } from 'react-router-dom'

export default function Header({ isAdmin, isAuthenticated, handleLogin, handleLogout }) {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="bg-blue-600 p-2 flex items-center justify-between w-full text-sm font-medium leading-5 shadow-[0px_4px_24px_rgba(0,0,0,0.35)] text-zinc-950">
      <div onClick={navigateToHome} className="flex items-center gap-2 cursor-pointer">
        <img
          src={require('../../assets/Trees.png')}
          alt="Tree"
          className="animate-spin w-[50px] h-[50px]"
        />
        <h1 className="text-white font-signika text-xl">Luke Tree Service</h1>
      </div>

      <div className="flex gap-4 items-center">
        {isAuthenticated && isAdmin ? (
          <>
            <div onClick={() => navigate('/reviews')} className="text-white cursor-pointer">Reviews</div>
            <div onClick={() => navigate('/about')} className="text-white cursor-pointer">About</div>
            <div onClick={() => navigate('/review')} className="text-white cursor-pointer">Write Review</div>
            <div onClick={handleLogout} className="flex gap-1 justify-center py-2 pr-2 pl-3 bg-white shadow rounded-[1000px] items-center cursor-pointer">
              <div>Logout</div>
              <img
                loading="lazy"
                src={arrow}
                className="shrink-0 w-4 aspect-square"
              />
            </div>
          </>)
          : (
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
    </div>
  )
}
