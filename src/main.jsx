import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import Orders from "./pages/orders";
import Pickups from "./pages/pickups";
import Login from "./pages/login";
import Register from "./pages/register";
import Account from "./pages/account";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="/packages" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/pickups" element={<Pickups />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
