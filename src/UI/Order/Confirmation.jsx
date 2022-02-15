import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
    const [orderToken, addOrderToken] = useState('');

    const generateString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = ' ';

        for (let i = 0; i < 6; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        addOrderToken(result.toUpperCase());
    };

    useEffect(() => {
        generateString();
    }, []);

    return (
        <div className="order-summary">
            <h1 className="order-header"> Order Confirmed </h1>
            <div className="section-seperator" />

            <h2 className="order-subheader"> Order Reference : {orderToken} </h2>
            <h2 className="order-subheader"> Use this reference when you pickup your order. </h2>

            <Link to="/" className="homepage-link">
                <button type="button" className="submit-button">
                    Return to the homepage
                </button>
            </Link>
        </div>
    );
}
