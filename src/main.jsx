import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/home";
import StaticExample from './pages/orders';
import Pickups from './pages/pickups';
import Login from './pages/login';
import Register from './pages/register';
import Account from './pages/account';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/orders' element={<StaticExample />} />
          <Route path='/pickups' element={<Pickups />} />
          <Route path='/account' element={<Account />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
