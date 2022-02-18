import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { methodAndHeaders } from './UI/ReusableComponents/Headers/Headers';
import PreviousOrders from './UI/PreviousOrders/PreviousOrders';
import OrderConfirmation from './UI/Order/Confirmation';
import Register from './UI/Register/Register';
import Header from './UI/Header/Header';
import Basket from './UI/Basket/Basket';
import Order from './UI/Order/Order';
import Login from './UI/Login/Login';
import Home from './UI/Home/Home';
import Menu from './UI/Menu/Menu';

function App() {
    const [userData, addUserData] = useState([]);

    const getUserDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                ...methodAndHeaders,
                body: JSON.stringify({ token: localStorage.token }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            response.json().then((data) => addUserData(data[0]));
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <BrowserRouter>
            <Header userData={userData} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/previous-orders" element={<PreviousOrders userData={userData} />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/basket" element={<Basket userData={userData} />} />
                <Route path="/order" element={<Order userData={userData} />} />
                <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation userData={userData} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
