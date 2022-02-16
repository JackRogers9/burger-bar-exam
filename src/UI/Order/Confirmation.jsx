import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH2 } from '../ReusableComponents/Headers/Headers';

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
