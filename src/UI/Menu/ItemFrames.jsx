import { nanoid } from 'nanoid';

export default function ItemFrame({ items }) {
    return items.map((item) => {
        const { name, displayPrice } = item;

        return (
            <div className="item-frame" key={`${name}-${nanoid()}`}>
                <h3 className="option-name"> {name} </h3>
                <h3 className="option-price"> {displayPrice} </h3>

                <button type="button" className="add-button">
                    Add to Basket
                </button>
            </div>
        );
    });
}
