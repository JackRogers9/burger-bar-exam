import { nanoid } from 'nanoid';
import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import './ItemFrames.css';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

export default function ItemFrame({ items, location, getItemsInBasket }) {
    const addToBasket = async (item) => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(item),
        };

        const response = await fetch('/addToBasket', requestOptions);
        const body = await response.json();

        console.log(body);
    };

    const removeFromBasket = async (item) => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(item),
        };

        const response = await fetch('/removeFromBasket', requestOptions);
        const body = await response.json();

        if (body.success) {
            getItemsInBasket();
        }

        console.log(body);
    };

    return items.map((item) => (
        <div className="item-frame" key={`${item.name}-${nanoid()}`}>
            <HeaderH3 className="option-name" text={item.name} />
            <HeaderH3 className="option-price" text={item.displayPrice} />

            {location === 'menu' && (
                <button
                    type="button"
                    className="change-basket-button"
                    onClick={() => addToBasket(item)}
                >
                    Add to Basket
                </button>
            )}

            {location === 'basket' && (
                <button
                    type="button"
                    className="change-basket-button"
                    onClick={() => removeFromBasket(item)}
                >
                    Remove from Basket
                </button>
            )}
        </div>
    ));
}
