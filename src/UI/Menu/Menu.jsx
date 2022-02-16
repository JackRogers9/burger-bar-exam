import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import { HeaderH2, HeaderH4 } from '../ReusableComponents/Headers/Headers';
import options from './MenuOptions.json';
import ItemFrame from './ItemFrames';
import './Menu.css';

const menuSections = [
    {
        items: options[0],
        subheader: 'Burgers',
        key: 'burgers-row',
        extraText: [
            'All Burgers come with relish and burger sauce.',
            'Chips are £1.00 when bought with any burger.',
        ],
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

const incorrectDataTypes = [undefined, null, NaN];

export default function Menu() {
    return (
        <ComponentPage>
            <ComponentBody header="Menu">
                {menuSections.map(({ items, subheader, key, extraText }) => (
                    <div key={key}>
                        <HeaderH2 className="menu-subheader" text={subheader} />
                        <ItemFrame items={items} location="menu" />

                        {!incorrectDataTypes.includes(extraText) && (
                            <>
                                <HeaderH4 text={extraText[0]} className="extra-information" />
                                <HeaderH4 text={extraText[1]} className="extra-information" />
                            </>
                        )}
                    </div>
                ))}
            </ComponentBody>
        </ComponentPage>
    );
}
