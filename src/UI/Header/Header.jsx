import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shoppingCart from '../Images/shopping-cart.svg';
import './Header.css';

export default function Header() {
    const [userLoggedIn, toggleLogin] = useState(false);

    const getUserDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.token,
                }),
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
            <Link to="/click-and-collect" className="header-link">
                <h3 className="header-title"> Click & Collect </h3>
            </Link>

            {userLoggedIn ? (
                <Link to="/account-details" className="header-link">
                    <h3 className="header-title"> Account Details </h3>
                </Link>
            ) : (
                <Link to="/register" className="header-link">
                    <h3 className="header-title"> Register </h3>
                </Link>
            )}

            <Link to="/basket" className="header-link">
                <img src={shoppingCart} alt="Basket" className="shopping-cart" />
            </Link>
        </div>
    );
}
