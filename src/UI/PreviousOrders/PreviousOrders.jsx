import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { HeaderH2, HeaderH3, methodAndHeaders } from '../ReusableComponents/Headers/Headers';
import ComponentBody from '../ReusableComponents/ComponentBody/ComponentBody';
import ComponentPage from '../ReusableComponents/ComponentPage/ComponentPage';
import OrderInformation from './OrderInformation';
import './PreviousOrders.css';

const price = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'GBP' });

const getDateAndTime = (timeStamp) => {
    const [date, time] = timeStamp.split('T');
    const [year, month, day] = date.split('-');

    const dateUkFormat = `${day}/${month}/${year}`;
    const timestamp = time.match(/.{1,5}/g);

    return [dateUkFormat, timestamp[0]];
};

export default function PreviousOrders({ userData }) {
    const [previousOrders, addPreviousOrders] = useState([]);

    const getPreviousOrders = async () => {
        const { userID } = userData;
        const requestOptions = { ...methodAndHeaders, body: JSON.stringify({ userID }) };

        const response = await fetch('/getPreviousOrders', requestOptions);
        response.json().then((data) => addPreviousOrders(data));
    };

    useEffect(() => {
        getPreviousOrders();
    }, []);

    return (
        <ComponentPage>
            <ComponentBody header="Previous Orders">
                {previousOrders.length > 0 ? (
                    <>
                        <HeaderH2 className="subheader" text="Previous Orders" />
                        <div className="column-headers-row">
                            <HeaderH3 text="Order Date" className="column-headers" />
                            <HeaderH3 text="Order Price" className="column-headers" />
                            <HeaderH3 text="Order Count" className="column-headers" />
                        </div>

                        {previousOrders.map(({ totalPrice, items, orderDate }) => {
                            const displayPrice = price.format(totalPrice);
                            const orderItems = JSON.parse(items, null, 4);

                            const [date, time] = getDateAndTime(orderDate);

                            return (
                                <OrderInformation
                                    date={date}
                                    time={time}
                                    items={orderItems}
                                    key={`${date}-${nanoid()}`}
                                    displayPrice={displayPrice}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
                        <HeaderH3 text="You have no previous orders." className="subheader" />
                        <Link to="/menu" className="browse-menu-link">
                            <HeaderH3 text="Click here to browse our menu." />
                        </Link>
                    </>
                )}

                <button
                    type="button"
                    className="submit-button"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location = '/';
                    }}
                >
                    Logout
                </button>
            </ComponentBody>
        </ComponentPage>
    );
}
