import { nanoid } from 'nanoid';

export default function ItemFrame({ items, location, getItemsInBasket }) {
    const addToBasket = async (item) => {
        console.log(item);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        };

        const response = await fetch('/addToBasket', requestOptions);
        const body = await response.json();

        console.log(body);
    };

    const removeFromBasket = async (item) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        };

        const response = await fetch('/removeFromBasket', requestOptions);
        const body = await response.json();

        if (body.success) {
            getItemsInBasket();
        }

        console.log(body);
    };

    return items.map((item) => {
        const { name, displayPrice } = item;

        return (
            <div className="item-frame" key={`${name}-${nanoid()}`}>
                <h3 className="option-name"> {name} </h3>
                <h3 className="option-price"> {displayPrice} </h3>

                {location === 'menu' && (
                    <button type="button" className="add-button" onClick={() => addToBasket(item)}>
                        Add to Basket
                    </button>
                )}

                {location === 'basket' && (
                    <button
                        type="button"
                        className="add-button"
                        onClick={() => removeFromBasket(item)}
                    >
                        Remove from Basket
                    </button>
                )}
            </div>
        );
    });
}
