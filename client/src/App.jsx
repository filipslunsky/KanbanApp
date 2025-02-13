import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './features/general/ProtectedRoute';
import Navbar from './features/general/Navbar';
import Home from './features/general/Home';
import Register from './features/user/Register';
import Login from './features/user/Login';
import Boards from './features/general/Boards';
import './App.css';

function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <>
      <BrowserRouter>
        {loggedIn && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/boards' element={<Boards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
