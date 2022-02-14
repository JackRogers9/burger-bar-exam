import ItemFrame from './ItemFrames';
import items from './Menu.json';
import './ClickAndCollect.css';

export default function Menu() {
    return (
        <div className="menu-page">
            <div className="menu-body">
                <h1 className="menu-header"> Click & Collect </h1>

                <h2 className="menu-subheader"> Burgers </h2>
                <ItemFrame items={items[0]} />

                <h2 className="menu-subheader"> Sides </h2>
                <ItemFrame items={items[1]} />

                <h2 className="menu-subheader"> Drinks </h2>
                <ItemFrame items={items[2]} />
            </div>
        </div>
    );
}
