import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

import { HeaderH4 } from '../ReusableComponents/Headers/Headers';
import './CardDetails.css';

const creditCardRegex = [
    {
        name: 'Visa',
        regex: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
    },
    {
        name: 'Mastercard',
        regex: /^(?:5[1-5][0-9]{14})$/,
    },
    {
        name: 'AmericanExpress',
        regex: /^(?:3[47][0-9]{13})$/,
    },
];

export default function CardDetails() {
    const [expiryDate, setExpiryDate] = useState(new Date());

    const validateCardNumber = () => {
        const cardNumber = document.getElementById('cardNumber').value;

        const results = creditCardRegex.reduce((previousValue, card) => {
            const validResults = previousValue[0] || [];
            const invalidResults = previousValue[1] || [];

            if (cardNumber.match(card.regex)) {
                validResults.push(true);
            } else {
                invalidResults.push(false);
            }

            return [validResults, invalidResults];
        }, []);

        if (!results[0].length > 0) {
            document.getElementById('register-error').innerHTML = 'The card number is invalid';
        } else {
            document.getElementById('register-error').innerHTML = '';
        }
    };

    const validateSortcode = () => {
        const sortcode = document.getElementById('sortcode').value;
        const sortcodeRegex = /^\d{6}$/;

        if (!sortcode.match(sortcodeRegex)) {
            document.getElementById('register-error').innerHTML = 'The sort code is invalid';
        } else {
            document.getElementById('register-error').innerHTML = '';
        }
    };

    const validateCVC = () => {
        const cvc = document.getElementById('cvc').value;
        const cvcRegex = /^\d{3}$/;

        if (!cvc.match(cvcRegex)) {
            document.getElementById('register-error').innerHTML = 'The sort code is invalid';
        } else {
            document.getElementById('register-error').innerHTML = '';
        }
    };

    const cardDetails = [
        {
            maxLength: '16',
            id: 'cardNumber',
            dataTestId: 'card-number-field',
            placeholder: 'Card number',
            onChange: validateCardNumber,
        },
        {
            maxLength: '6',
            id: 'sortcode',
            dataTestId: 'sort-code-field',
            placeholder: 'Sort code',
            onChange: validateSortcode,
        },
        {
            maxLength: '3',
            id: 'cvc',
            dataTestId: 'cvc-field',
            placeholder: 'CVC',
            onChange: validateCVC,
        },
        {
            maxLength: '',
            id: 'expiry',
            placeholder: '',
            onChange: validateCVC,
        },
    ];

    return (
        <div className="card-details-section">
            <HeaderH4 text="Card Details" className="card-label" />

            <div className="card-input-column">
                {cardDetails.map(({ id, placeholder, onChange, maxLength, dataTestId }) => (
                    <div key={id} className="card-number-row">
                        {id === 'expiry' ? (
                            <DatePicker
                                selected={expiryDate}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                placeholderText="Expiry Date"
                                className="expiry-date-picker"
                                onChange={(date) => setExpiryDate(date)}
                            />
                        ) : (
                            <input
                                id={id}
                                data-testid={dataTestId}
                                maxLength={maxLength}
                                className="card-input"
                                placeholder={placeholder}
                                onChange={onChange}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
