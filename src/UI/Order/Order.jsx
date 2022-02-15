import { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import './Order.css';

export const googleMapsUrl =
    'https://www.google.co.uk/maps/place/70+Regent+St,+Cheltenham+GL50+1HA/@51.9003958,-2.0767852,17z/data=!3m1!4b1!4m5!3m4!1s0x48711b9708de4501:0x822d744420fcb1ca!8m2!3d51.9003925!4d-2.0745965';

export default function Order() {
    const [totalCost, updateCost] = useState(0);
    const [clicked, toggleClick] = useState(false);
    const [ordered, clickOrder] = useState(false);
    const [allItems, addItems] = useState([]);

    const navigate = useNavigate();

    const calculateCost = (items) => {
        updateCost(0);

        items.forEach((item) => {
            updateCost((currentPrice) => currentPrice + item.price);
        });
    };

    const getItemsInBasket = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
        };

        const response = await fetch('/getItemsInBasket', requestOptions);
        const body = await response.json();

        addItems(body);
        calculateCost(body);
    };

    const addToPreviousOrders = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: allItems, totalCost }),
        };

        const response = await fetch('/addToPreviousOrders', requestOptions);
        const body = await response.json();

        console.log(body);
    };

    function delay(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const orderConfirmation = async () => {
        clickOrder(true);
        addToPreviousOrders();

        await delay(2000);
        navigate('/order-confirmation');
    };

    useEffect(() => {
        getItemsInBasket();
    }, []);

    const formatPrice = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'GBP' });

    return (
        <div className="order-summary">
            <h1 className="order-header"> Order Summary </h1>
            <h2 className="total-price-header">
                {`Total Price : ${formatPrice.format(totalCost)}`}
            </h2>

            <div className="section-seperator" />

            <h2 className="order-subheader"> Delivery Options </h2>

            <button
                type="button"
                className={clicked ? 'delivery-button-clicked' : 'delivery-button'}
                onClick={() => toggleClick(!clicked)}
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

            <div className="section-seperator" />

            <button type="button" className="submit-button" onClick={orderConfirmation}>
                Order
            </button>

            {ordered && (
                <div className="loading-message">
                    <TailSpin color="#485c5c" height={40} width={40} />
                    <h3 className="card-details-message"> Loading card details... </h3>
                </div>
            )}
        </div>
    );
}
