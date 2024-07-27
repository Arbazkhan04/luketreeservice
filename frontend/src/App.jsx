import Button from '@mui/material/Button';
import Header from './components/header'
import Home from './components/home'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './components/login'
import Review from './components/review'

function App(){

   return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="review" element={<Review/>} />
        </Routes>
      </div>
    </Router>
  );

}

export default App; 