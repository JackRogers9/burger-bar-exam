import { useState, useEffect } from 'react';

import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { methodAndHeaders } from '../ReusableComponents/Headers/Headers';
import BasketMessages from './BasketMessages';
import ItemFrame from '../Menu/ItemFrames';
import './Basket.css';

export default function Basket({ userData }) {
    const [allItems, addItems] = useState([]);
    const [burgers, addBurgers] = useState([]);
    const [sides, addSides] = useState([]);
    const [drinks, addDrinks] = useState([]);

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

    const countBurgers = (body) => {
        let count = 0;

        body.forEach((item) => {
            if (item.category === 'Burgers') {
                count += 1;
            }
        });

        return count;
    };

    const updateChips = (body) => {
        let burgersLeft = countBurgers(body);

        const updatedItems = body.map((item) => {
            const { id, name, category } = item;

            if (burgersLeft > 0) {
                if (name === 'Chips') {
                    burgersLeft -= 1;
                    return {
                        id,
                        category,
                        name: 'Chips (Bought with burger)',
                        displayPrice: '£1.00',
                        price: 1,
                    };
                }
                return item;
            }
            return item;
        });

        checkItemsInBasket(updatedItems);
    };

    const getItemsInBasket = async () => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(),
        };

        const response = await fetch('/getItemsInBasket', requestOptions);
        response.json().then((data) => updateChips(data));
    };

    useEffect(() => {
        getItemsInBasket();
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

                <BasketMessages userData={userData} allItems={allItems} />
            </ComponentBody>
        </ComponentPage>
    );
}
