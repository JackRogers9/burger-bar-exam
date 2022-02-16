import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH2 } from '../ReusableComponents/Headers/Headers';
import options from './MenuOptions.json';
import ItemFrame from './ItemFrames';
import './Menu.css';

const menuSections = [
    {
        items: options[0],
        subheader: 'Burgers',
        key: 'burgers-row',
    },
    {
        items: options[1],
        subheader: 'Sides',
        key: 'sides-row',
    },
    {
        items: options[2],
        subheader: 'Drinks',
        key: 'drinks-row',
    },
];

export default function Menu() {
    return (
        <ComponentPage>
            <ComponentBody header="Menu">
                {menuSections.map(({ items, subheader, key }) => (
                    <div key={key}>
                        <HeaderH2 className="menu-subheader" text={subheader} />
                        <ItemFrame items={items} location="menu" />
                    </div>
                ))}
            </ComponentBody>
        </ComponentPage>
    );
}
