import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Store.js";

import FetchData from "./Components/FetchData/FetchData.tsx";
import Layout from "./Layouts/Layout.tsx";
import Customers from "./Pages/Customers/Customers.tsx";
import Dashboard from "./Pages/Dashboard/Dashboard.tsx";
import ExpiryDates from "./Pages/ExpiryDates/ExpiryDates.tsx";
import Login from "./Pages/Login/Login.tsx";
import AddProduct from "./Pages/Products/AddProduct.tsx";
import EditProduct from "./Pages/Products/EditProduct.tsx";
import Products from "./Pages/Products/Products.tsx";
import Receipt from "./Pages/Receipt/Receipt.tsx";
import Settings from "./Pages/Settings/Settings.tsx";
import Statistics from "./Pages/Statistics/Statistics.tsx";
import Test from "./Pages/Test/Test.tsx";

export default function App() {
    // const idle = useIdle(60000);
    // const signOut = useLoginStore((state) => state.signOut);

    // useEffect(() => {
    //     if (idle) {
    //         signOut();
    //     }
    // }, [idle]);

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
                        <Route path="/test" element={<Test />} />
                        <Route path="/customers" element={<Customers />} />
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
