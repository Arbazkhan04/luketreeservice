
import Header from './components/header'
import Loader from './components/loader'
// import Home from './components/home'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import { lazy , Suspense} from 'react'

const Home = lazy(()=>import('./components/home'))
const Login = lazy(()=>import('./components/login'))
const Review = lazy(()=>import('./components/review'))


function App(){

   return (
    <Router>
        <Header />
        <Suspense fallback ={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="review" element={<Review/>} />
        </Routes>
        </Suspense>
    </Router>
  );

}

export default App; 