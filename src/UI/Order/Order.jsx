import { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH2, HeaderH3, HeaderSeperator } from '../ReusableComponents/Headers/Headers';
import './Order.css';

export const googleMapsUrl =
    'https://www.google.co.uk/maps/place/70+Regent+St,+Cheltenham+GL50+1HA/@51.9003958,-2.0767852,17z/data=!3m1!4b1!4m5!3m4!1s0x48711b9708de4501:0x822d744420fcb1ca!8m2!3d51.9003925!4d-2.0745965';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export default function Order() {
    const [totalCost, updateCost] = useState(0);
    const [clicked, toggleClick] = useState(false);
    const [ordered, clickOrder] = useState(false);
    const [allItems, addItems] = useState([]);

    const calculateCost = (items) => {
        updateCost(0);

        items.forEach((item) => {
            updateCost((currentPrice) => currentPrice + item.price);
        });
    };

    const getItemsInBasket = async () => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(),
        };

        const response = await fetch('/getItemsInBasket', requestOptions);
        const body = await response.json();

        addItems(body);
        calculateCost(body);
    };

    const addToPreviousOrders = async (userID) => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify({ userID, items: allItems, totalCost }),
        };

        const response = await fetch('/addToPreviousOrders', requestOptions);
        const body = await response.json();

        console.log(body);
    };

    const removeAllItemsFromBasket = async () => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(),
        };

        const response = await fetch('/removeAllFromBasket', requestOptions);
        const body = await response.json();

        console.log(body);
    };

    const getDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                ...methodAndHeaders,
                body: JSON.stringify({ token: localStorage.token }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            const body = await response.json();

            addToPreviousOrders(body[0].userID);
        }
    };

    const delay = async (ms) =>
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        });

    const navigate = useNavigate();

    const orderConfirmation = async () => {
        clickOrder(true);
        getDetails();
        removeAllItemsFromBasket();

        await delay(2000);
        navigate('/order-confirmation');
    };

    useEffect(() => {
        getItemsInBasket();
    }, []);

    const formatPrice = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'GBP' });

    return (
        <ComponentBody header="Order Summary">
            <HeaderH2
                className="total-price-header"
                text={`Total Price : ${formatPrice.format(totalCost)}`}
            />

            <HeaderH2 className="order-subheader" text="Delivery Options" />

            <button
                type="button"
                onClick={() => toggleClick(!clicked)}
                className={clicked ? 'delivery-button-clicked' : 'delivery-button'}
            >
                Collection
            </button>

            {clicked && (
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    className="maps-link"
                    rel="noopener noreferrer"
                >
                    Click here to see the restaurant on Google Maps
                </a>
            )}

            <button type="button" className="delivery-button-disabled" disabled>
                Home Delivery (Coming Soon)
            </button>

            <HeaderSeperator />

            <button type="button" className="submit-button" onClick={orderConfirmation}>
                Order
            </button>

            {ordered && (
                <div className="loading-message">
                    <TailSpin color="#485c5c" height={40} width={40} />
                    <HeaderH3 className="card-details-message" text="Loading card details..." />
                </div>
            )}
        </ComponentBody>
    );
}
