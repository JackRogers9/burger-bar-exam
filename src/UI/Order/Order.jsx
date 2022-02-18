import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import ExternalLink from '../ReusableComponents/ExternalLink/ExternalLink';
import {
    HeaderH2,
    HeaderH3,
    HeaderSeperator,
    methodAndHeaders,
} from '../ReusableComponents/Headers/Headers';
import './Order.css';

export default function Order({ userData }) {
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
        response.json().then((data) => {
            addItems(data);
            calculateCost(data);
        });
    };

    const addToPreviousOrders = async () => {
        const { userID } = userData;

        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify({ userID, items: allItems, totalCost }),
        };

        await fetch('/addToPreviousOrders', requestOptions);
    };

    const removeAllItemsFromBasket = async () => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(),
        };

        await fetch('/removeAllFromBasket', requestOptions);
    };

    const delay = async (ms) =>
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        });

    const navigate = useNavigate();

    const orderConfirmation = async () => {
        clickOrder(true);
        addToPreviousOrders();
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
                <ExternalLink
                    className="google-maps-link-order"
                    text="Click here to see the restaurant on Google Maps"
                />
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
