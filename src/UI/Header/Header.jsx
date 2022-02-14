import { Link } from 'react-router-dom';
import shoppingCart from '../Images/shopping-cart.svg';
import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <Link to="/click-and-collect" className="header-link">
                <h3 className="header-title"> Click & Collect </h3>
            </Link>
            <Link to="/register" className="header-link">
                <h3 className="header-title"> Register </h3>
            </Link>
            <Link to="/basket" className="header-link">
                <img src={shoppingCart} alt="Basket" className="shopping-cart" />
            </Link>
        </div>
    );
}
