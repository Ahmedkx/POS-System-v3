import "./App.css";
import "./Store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
    return (
        <>
            <FetchData />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/receipt" element={<Receipt />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

{
    /* <BrowserRouter>
<Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
    </Route>
</Routes>
</BrowserRouter> */
}
