import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountDetails from './UI/AccountDetails/AccountDetails';
import OrderConfirmation from './UI/Order/Confirmation';
import Register from './UI/Register/Register';
import Header from './UI/Header/Header';
import Basket from './UI/Basket/Basket';
import Order from './UI/Order/Order';
import Login from './UI/Login/Login';
import Home from './UI/Home/Home';
import Menu from './UI/Menu/Menu';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account-details" element={<AccountDetails />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
