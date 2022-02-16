import { useState } from 'react';

import { HeaderH3 } from '../ReusableComponents/Headers/Headers';
import ItemFrames from '../Menu/ItemFrames';
import './PreviousOrders.css';

export default function PreviousOrder({ date, time, displayPrice, items }) {
    const [expandOrder, toggleExpand] = useState(false);

    return (
        <div className="previous-order-item">
            <div className="previous-order-summary">
                <div className="previous-order-text">
                    <HeaderH3 text={date} className="previous-order-date" />
                    <HeaderH3 text={time} className="previous-order-date" />
                </div>
                <HeaderH3 text={displayPrice} className="previous-order-text" />
                <HeaderH3 text={items.length} className="previous-order-text" />

                <button
                    type="button"
                    className="previous-order-button"
                    onClick={() => toggleExpand(!expandOrder)}
                >
                    {expandOrder ? 'Shrink' : 'Expand'}
                </button>

                <button type="button" className="previous-order-button">
                    Reorder
                </button>
            </div>

            {expandOrder && <ItemFrames items={items} />}
        </div>
    );
}
