import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderH2, methodAndHeaders } from '../ReusableComponents/Headers/Headers';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';

export default function OrderConfirmation() {
    const [orderToken, setOrderToken] = useState('');

    const getUserDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                ...methodAndHeaders,
                body: JSON.stringify({ token: localStorage.token }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            response.json().then((data) => setOrderToken(data[0].userID));
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <ComponentBody header="Order Confirmed">
            <HeaderH2 className="order-subheader" text={`Order Reference : ${orderToken}`} />

            <HeaderH2
                className="order-subheader"
                text="Use this reference when you pickup your order."
            />

            <Link to="/" className="homepage-link">
                <button type="button" className="submit-button">
                    Return to the homepage
                </button>
            </Link>
        </ComponentBody>
    );
}
