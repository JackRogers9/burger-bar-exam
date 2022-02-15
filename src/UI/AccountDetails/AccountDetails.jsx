import { useEffect, useState } from 'react';
import { HeaderH1, HeaderH2, HeaderH3 } from '../ReusableComponents/Headers';
import PreviousOrder from './PreviousOrders';
import './AccountDetails.css';

const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const formatPrice = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'GBP' });

export default function AccountDetails() {
    const [previousOrders, addPreviousOrders] = useState([]);

    const getPreviousOrders = async (userID) => {
        const requestOptions = { ...methodAndHeaders, body: JSON.stringify({ userID }) };

        const response = await fetch('/getPreviousOrders', requestOptions);
        const body = await response.json();

        addPreviousOrders(body);
    };

    const getUserDetails = async () => {
        if (localStorage.token) {
            const requestOptions = {
                ...methodAndHeaders,
                body: JSON.stringify({ token: localStorage.token }),
            };

            const response = await fetch('/getUserDetails', requestOptions);
            const body = await response.json();

            getPreviousOrders(body[0].userID);
        }
    };

    const getDateAndTime = (timeStamp) => {
        const [date, time] = timeStamp.split('T');
        const [year, month, day] = date.split('-');

        const dateUkFormat = `${day}/${month}/${year}`;
        const timeFormat = time.match(/.{1,5}/g);

        return [dateUkFormat, timeFormat[0]];
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="account-details-page">
            <div className="account-details-body">
                <HeaderH1 className="account-header" text="Account Details" />

                <div className="section-seperator" />

                <HeaderH2 className="account-subheader" text="Previous Orders" />

                {previousOrders.length > 0 && (
                    <div className="previous-order-body">
                        <div className="previous-order-subheaders-row">
                            <HeaderH3 text="Order Date" className="previous-order-subheaders" />
                            <HeaderH3 text="Order Price" className="previous-order-subheaders" />
                            <HeaderH3 text="Order Count" className="previous-order-subheaders" />
                        </div>

                        {previousOrders.map((order) => {
                            const { totalPrice, items, orderDate } = order;
                            const displayPrice = formatPrice.format(totalPrice);
                            const orderItems = JSON.parse(items, null, 4);

                            const [date, time] = getDateAndTime(orderDate);

                            return (
                                <PreviousOrder
                                    date={date}
                                    time={time}
                                    items={orderItems}
                                    displayPrice={displayPrice}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
