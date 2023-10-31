import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layouts/Layout.tsx";
import Login from "./Pages/Login/Login.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Products from "./Pages/Products/Products.tsx";
import Statistics from "./Pages/Statistics/Statistics.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/products" element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
