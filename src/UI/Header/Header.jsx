import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import basketImage from '../Images/basket.png';
import logo from '../Images/logo.png';
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
            response.json().then((data) => toggleLogin(data[0]));
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="header">
            <Link to="/" className="logo-link">
                <img src={logo} alt="Logo" className="logo" />
            </Link>

            <Link to="/menu" className="header-link">
                <HeaderH3 className="header-title" text="Menu" />
            </Link>

            {userLoggedIn ? (
                <Link to="/previous-orders" className="header-link">
                    <HeaderH3
                        className="header-title"
                        text="Previous Orders"
                        dataTestId="previous-orders-link"
                    />
                </Link>
            ) : (
                <Link to="/register" className="header-link">
                    <HeaderH3 className="header-title" text="Register" />
                </Link>
            )}

            <Link to="/basket" className="header-link">
                <img
                    src={basketImage}
                    alt="Basket"
                    className="shopping-cart"
                    data-testid="shopping-cart"
                />
            </Link>
        </div>
    );
}
