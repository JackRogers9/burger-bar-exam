import items from './MenuOptions.json';
import ItemFrame from './ItemFrames';
import './Menu.css';

export default function Menu() {
    return (
        <div className="menu-page">
            <div className="menu-body">
                <h1 className="menu-header"> Menu </h1>

                <h2 className="menu-subheader"> Burgers </h2>
                <ItemFrame items={items[0]} basket={false} />

                <h2 className="menu-subheader"> Sides </h2>
                <ItemFrame items={items[1]} basket={false} />

                <h2 className="menu-subheader"> Drinks </h2>
                <ItemFrame items={items[2]} basket={false} />
            </div>
        </div>
    );
}
