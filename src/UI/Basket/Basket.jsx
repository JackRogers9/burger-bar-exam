import { useState, useEffect } from 'react';

import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import BasketMessages from './BasketMessages';
import ItemFrame from '../Menu/ItemFrames';
import './Basket.css';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export default function Basket() {
    const [allItems, addItems] = useState([]);
    const [burgers, addBurgers] = useState([]);
    const [sides, addSides] = useState([]);
    const [drinks, addDrinks] = useState([]);
    const [userLoggedIn, toggleLogin] = useState(false);

    const getDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                ...methodAndHeaders,
                body: JSON.stringify({ token: localStorage.token }),
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
            ...methodAndHeaders,
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

    const basketSections = [
        {
            items: burgers,
            subheader: 'Burgers',
            key: 'burgers-row-basket',
        },
        {
            items: sides,
            subheader: 'Sides',
            key: 'sides-row-basket',
        },
        {
            items: drinks,
            subheader: 'Drinks',
            key: 'drinks-row-basket',
        },
    ];

    return (
        <ComponentPage>
            <ComponentBody header="Basket">
                {basketSections.map(
                    ({ items, subheader, key }) =>
                        items.length > 0 && (
                            <div key={key}>
                                <h2 className="basket-subheader"> {subheader} </h2>
                                <ItemFrame
                                    items={items}
                                    location="basket"
                                    getItemsInBasket={getItemsInBasket}
                                />
                            </div>
                        )
                )}

                <BasketMessages userLoggedIn={userLoggedIn} allItems={allItems} />
            </ComponentBody>
        </ComponentPage>
    );
}
