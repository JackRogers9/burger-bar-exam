import { Link } from 'react-router-dom';

export default function BasketMessages({ userLoggedIn, allItems }) {
    return (
        <>
            {!allItems.length > 0 && (
                <div className="empty-basket-message">
                    <h3 className="alert-text"> You have added no items to your basket. </h3>

                    <Link to="/menu" className="order-link">
                        <h3 className="menu-link"> Click here to browse our Menu. </h3>
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
                    <h3 className="alert-text">
                        You are not currently signed in. Please Register or Sign in.
                    </h3>
                    <div className="register-and-login-link">
                        <Link to="/register" className="basket-link">
                            <h3> Register </h3>
                        </Link>
                        <h3 className="link-seperator"> / </h3>
                        <Link to="/login" className="basket-link">
                            <h3> Login </h3>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}
