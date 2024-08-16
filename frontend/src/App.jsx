

// import Home from './components/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'

import Header from './user/components/header'
import Loader from './user/components/loader'
import adminRoutes from './shared/components/adminRoute'
import ProtectedRoute from './shared/components/protectedRoute'

const Home = lazy(() => import('./user/components/home'))
const Login = lazy(() => import('./user/components/login'))
const Review = lazy(() => import('./user/components/review'))



function App() {

  return (
    <Router>
       <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route path="review" element={<Review />} />
          {adminRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  {element}
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );

}

export default App; 