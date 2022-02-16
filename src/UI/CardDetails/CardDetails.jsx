// import { useState } from 'react';

import { HeaderH4 } from '../ReusableComponents/Headers/Headers';
import './CardDetails.css';

// const creditCardRegex = [
//     {
//         name: 'Visa',
//         regex: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
//     },
//     {
//         name: 'Mastercard',
//         regex: /^(?:5[1-5][0-9]{14})$/,
//     },
//     {
//         name: 'AmericanExpress',
//         regex: /^(?:3[47][0-9]{13})$/,
//     },
// ];

// const methodAndHeaders = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
// };

export default function CardDetails() {
    // const validateCardNumber = () => {
    //     // const cvcRegex = /^\d{1,3}$/;
    //     const cardNumber = document.getElementById('cardNumber').value;

    //     creditCardRegex.forEach((card) => {
    //         const { regex } = card;

    //         if (cardNumber.match(regex)) {
    //             console.log('Valid');
    //         } else {
    //             console.log('InValid');
    //         }
    //     });
    // };

    // const validateSortcode = () => {
    //     const sortcode = document.getElementById('sortcode').value;
    //     const sortcodeRegex = /^\d{6}$/;

    //     if (sortcode.match(sortcodeRegex)) {
    //         console.log('Valid sortcode');
    //     } else {
    //         console.log('invalid');
    //     }
    // };

    // const saveUsersCardDetails = async (userID) => {
    //     const cardNumber = document.getElementById('cardNumber').value;
    //     const sortCode = document.getElementById('sortcode').value;
    //     const cvc = document.getElementById('cvc').value;

    //     const requestOptions = {
    //         ...methodAndHeaders,
    //         body: JSON.stringify({ userID, cardNumber, sortCode, cvc }),
    //     };

    //     const response = await fetch('/saveCardDetails', requestOptions);
    //     const body = await response.json();

    //     console.log(body);
    // };

    // const getDetails = async () => {
    //     if (localStorage.token) {
    //         const requestOptions = {
    //             ...methodAndHeaders,
    //             body: JSON.stringify({ token: localStorage.token }),
    //         };

    //         const response = await fetch('/getUserDetails', requestOptions);
    //         const body = await response.json();

    //         saveUsersCardDetails(body[0].userID);
    //     }
    // };

    return (
        <div className="card-details-section">
            <HeaderH4 text="Card Details" className="card-label" />

            <div className="card-input-column">
                <div className="card-number-row">
                    <input
                        maxLength="16"
                        id="cardNumber"
                        className="card-input"
                        placeholder="Card Number"
                        // onChange={validateCardNumber}
                    />
                </div>

                <div className="card-number-row">
                    <input
                        maxLength="6"
                        id="sortcode"
                        className="card-input"
                        placeholder="Sort Code"
                        // onChange={validateSortcode}
                    />
                </div>

                <div className="card-number-row">
                    <input maxLength="3" id="cvc" placeholder="CVC" className="card-input" />
                </div>

                {/* {invalidCardNumber.length > 0 ? (
                        <HeaderH4 text="Card number is invalid" className="error-message-column" />
                    ) : (
                        <div className="error-message-column" />
                    )} */}
            </div>
        </div>
    );
}
