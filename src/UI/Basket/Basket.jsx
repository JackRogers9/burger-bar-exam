import { useState, useEffect } from 'react';
import BasketMessages from './BasketMessages';
import ItemFrame from '../Menu/ItemFrames';
import './Basket.css';

export default function Basket() {
    const [allItems, addItems] = useState([]);
    const [burgers, addBurgers] = useState([]);
    const [sides, addSides] = useState([]);
    const [drinks, addDrinks] = useState([]);
    const [userLoggedIn, toggleLogin] = useState(false);

    const getDetails = async () => {
        console.log(localStorage.token);

        if (localStorage.token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: localStorage.token,
                }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            const body = await response.json();
            toggleLogin(body[0]);
        }
    };

    const checkItemsInBasket = (items) => {
        addItems([]);
        addBurgers([]);
        addSides([]);
        addDrinks([]);

        items.forEach((item) => {
            const { category } = item;

            switch (true) {
                case category === 'Burgers': {
                    addItems((currentOrder) => [...currentOrder, item]);
                    addBurgers((currentOrder) => [...currentOrder, item]);
                    break;
                }
                case category === 'Sides': {
                    addItems((currentOrder) => [...currentOrder, item]);
                    addSides((currentOrder) => [...currentOrder, item]);
                    break;
                }
                case category === 'Drinks': {
                    addItems((currentOrder) => [...currentOrder, item]);
                    addDrinks((currentOrder) => [...currentOrder, item]);
                    break;
                }
                default: {
                    console.log('Invalid');
                }
            }
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

        checkItemsInBasket(body);
    };

    useEffect(() => {
        getItemsInBasket();
        getDetails();
    }, []);

    return (
        <div className="basket-page">
            <div className="basket-body">
                <h1 className="basket-header"> Basket </h1>

                {burgers.length > 0 && (
                    <>
                        <h2 className="basket-subheader"> Burgers </h2>
                        <ItemFrame items={burgers} getItemsInBasket={getItemsInBasket} basket />
                    </>
                )}

                {sides.length > 0 && (
                    <>
                        <h2 className="basket-subheader"> Sides </h2>
                        <ItemFrame items={sides} getItemsInBasket={getItemsInBasket} basket />
                    </>
                )}

                {drinks.length > 0 && (
                    <>
                        <h2 className="basket-subheader"> Drinks </h2>
                        <ItemFrame items={drinks} getItemsInBasket={getItemsInBasket} basket />
                    </>
                )}

                <BasketMessages userLoggedIn={userLoggedIn} allItems={allItems} />
            </div>
        </div>
    );
}
