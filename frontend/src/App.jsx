
import Header from './user/components/header'
import Loader from './user/components/loader'
// import Home from './components/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./user/components/home'))
const Login = lazy(() => import('./user/components/login'))
const Review = lazy(() => import('./user/components/writeReview'))


function App() {

  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </Suspense>
    </Router>
  );

}

export default App; 