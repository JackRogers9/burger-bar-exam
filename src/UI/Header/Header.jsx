import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import shoppingCart from '../Images/ShoppingCart.jpg';
import './Header.css';

export default function Header() {
    const [userLoggedIn, toggleLogin] = useState(false);

    const getUserDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.token }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            const body = await response.json();

            toggleLogin(body[0]);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="header">
            <Link to="/menu" className="header-link">
                <HeaderH3 className="header-title" text="Menu" />
            </Link>

            {userLoggedIn ? (
                <Link to="/account-details" className="header-link">
                    <HeaderH3 className="header-title" text="Account Details" />
                </Link>
            ) : (
                <Link to="/register" className="header-link">
                    <HeaderH3 className="header-title" text="Register" />
                </Link>
            )}

            <Link to="/basket" className="header-link">
                <img src={shoppingCart} alt="Basket" className="shopping-cart" />
            </Link>
        </div>
    );
}
