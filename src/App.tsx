import "./App.css";
import "./Store.js";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layouts/Layout.tsx";
import Login from "./Pages/Login/Login.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import Products from "./Pages/Products/Products.tsx";
import AddProduct from "./Pages/Products/AddProduct.tsx";
import Statistics from "./Pages/Statistics/Statistics.tsx";
import EditProduct from "./Pages/Products/EditProduct.tsx";
import Settings from "./Pages/Settings/Settings.tsx";
import FetchData from "./Components/FetchData/FetchData.tsx";
import Receipt from "./Pages/Receipt/Receipt.tsx";
import ExpiryDates from "./Pages/ExpiryDates/ExpiryDates.tsx";

export default function App() {
    return (
        <>
            <FetchData />
            <HashRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/receipt" element={<Receipt />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/expirydates" element={<ExpiryDates />} />
                        <Route
                            path="/products/edit/:id"
                            element={<EditProduct />}
                        />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    );
}
