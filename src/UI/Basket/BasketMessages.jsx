import { Link } from 'react-router-dom';

import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import './BasketMessages.css';

export default function BasketMessages({ userLoggedIn, allItems }) {
    return (
        <>
            {!allItems.length > 0 && (
                <div className="empty-basket-message">
                    <HeaderH3
                        className="alert-text"
                        text="You have added no items to your basket."
                    />

                    <Link to="/menu" className="order-link">
                        <HeaderH3 className="menu-link" text="Click here to browse our Menu." />
                    </Link>
                </div>
            )}

            {userLoggedIn && allItems.length > 0 && (
                <Link to="/order" className="order-link">
                    <button type="button" className="submit-button">
                        Continue
                    </button>
                </Link>
            )}

            {!userLoggedIn && allItems.length > 0 && (
                <>
                    <HeaderH3
                        className="alert-text"
                        text="You are not currently signed in. Please Register or Sign in."
                    />

                    <div className="link-row">
                        <Link to="/register" className="basket-link">
                            <HeaderH3 text="Register" />
                        </Link>

                        <HeaderH3 text="/" className="link-seperator" />

                        <Link to="/login" className="basket-link">
                            <HeaderH3 text="Login" />
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}
