import { useState } from 'react';

import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import ItemFrames from '../Menu/ItemFrames';
import './PreviousOrders.css';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

const addToBasket = async (item) => {
    const requestOptions = {
        ...methodAndHeaders,
        body: JSON.stringify(item),
    };

    const response = await fetch('/addToBasket', requestOptions);
    const body = await response.json();

    console.log(body);
};

const addPreviousOrderToBasket = (items) => {
    removeAllItemsFromBasket();

    items.forEach((item) => {
        addToBasket(item);
    });
};

export default function PreviousOrder({ date, time, displayPrice, items }) {
    const [expandOrder, toggleExpand] = useState(false);

    return (
        <div className="previous-order-item">
            <div className="previous-order-summary">
                <div className="previous-order-information">
                    <div className="previous-order-text">
                        <HeaderH3 text={date} className="previous-order-date" />
                        <HeaderH3 text={time} className="previous-order-date" />
                    </div>
                    <HeaderH3 text={displayPrice} className="previous-order-text" />
                    <HeaderH3 text={items.length} className="previous-order-text" />
                </div>

                <div className="previous-order-button-row">
                    <button
                        type="button"
                        className="previous-order-button"
                        onClick={() => toggleExpand(!expandOrder)}
                    >
                        {expandOrder ? 'Shrink' : 'Expand'}
                    </button>

                    <button
                        type="button"
                        className="previous-order-button"
                        onClick={() => addPreviousOrderToBasket(items)}
                    >
                        Reorder
                    </button>
                </div>
            </div>

            {expandOrder && <ItemFrames items={items} />}
        </div>
    );
}
