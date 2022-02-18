import { nanoid } from 'nanoid';

import { HeaderH3, methodAndHeaders } from '../ReusableComponents/Headers/Headers';
import './ItemFrames.css';

export default function ItemFrame({ items, location, getItemsInBasket }) {
    const addToBasket = async (item) => {
        const requestOptions = {
            ...methodAndHeaders,
            body: JSON.stringify(item),
        };

        await fetch('/addToBasket', requestOptions);
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
    };

    return items.map((item) => (
        <div className="item-frame" key={`${item.name}-${nanoid()}`}>
            <HeaderH3 className="option-name" text={item.name} />
            <HeaderH3 className="option-price" text={item.displayPrice} />

            {location === 'menu' && (
                <button
                    type="button"
                    data-testid={`${item.name}-button`}
                    className="change-basket-button"
                    onClick={() => addToBasket(item)}
                >
                    Add to Basket
                </button>
            )}

            {location === 'basket' && (
                <button
                    type="button"
                    data-testid={`remove-${item.name}-button`}
                    className="change-basket-button"
                    onClick={() => removeFromBasket(item)}
                >
                    Remove from Basket
                </button>
            )}
        </div>
    ));
}
