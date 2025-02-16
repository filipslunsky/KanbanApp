import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './features/general/ProtectedRoute';
import Home from './features/general/Home';
import Register from './features/user/Register';
import Login from './features/user/Login';
import Boards from './features/general/Boards';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
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
