import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layouts/Layout.jsx";
import Products from "./Pages/Products/Proucts.js";
import Login from "./Pages/Login/Login.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<div>Hi</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
