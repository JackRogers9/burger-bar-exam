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
    const [cardNumberIsValid, updateCardNumber] = useState(true);
    const [sortCodeIsValid, updateSortcode] = useState(true);
    const [CVCIsValid, updateCVC] = useState(true);
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

        if (results[0].length > 0) {
            updateCardNumber(true);
        } else {
            updateCardNumber(false);
        }
    };

    const validateSortcode = () => {
        const sortcode = document.getElementById('sortcode').value;
        const sortcodeRegex = /^\d{6}$/;

        if (sortcode.match(sortcodeRegex)) {
            updateSortcode(true);
        } else {
            updateSortcode(false);
        }
    };

    const validateCVC = () => {
        const cvc = document.getElementById('cvc').value;
        const cvcRegex = /^\d{3}$/;

        if (cvc.match(cvcRegex)) {
            updateCVC(true);
        } else {
            updateCVC(false);
        }
    };

    const cardDetails = [
        {
            maxLength: '16',
            id: 'cardNumber',
            errorName: 'Card Number',
            dataTestId: 'card-number-field',
            placeholder: 'Card number',
            isValid: cardNumberIsValid,
            onChange: validateCardNumber,
        },
        {
            maxLength: '6',
            id: 'sortcode',
            errorName: 'Sort Code',
            dataTestId: 'sort-code-field',
            placeholder: 'Sort code',
            isValid: sortCodeIsValid,
            onChange: validateSortcode,
        },
        {
            maxLength: '3',
            id: 'cvc',
            errorName: 'CVC',
            dataTestId: 'cvc-field',
            placeholder: 'CVC',
            isValid: CVCIsValid,
            onChange: validateCVC,
        },
        {
            maxLength: '3',
            id: 'expiry',
            errorName: 'CVC',
            placeholder: 'CVC',
            isValid: CVCIsValid,
            onChange: validateCVC,
        },
    ];

    return (
        <div className="card-details-section">
            <HeaderH4 text="Card Details" className="card-label" />

            <div className="card-input-column">
                {cardDetails.map((details) => {
                    const { errorName, id, placeholder, isValid, onChange, maxLength, dataTestId } =
                        details;

                    return (
                        <div key={id} className="card-number-row">
                            {id === 'expiry' ? (
                                <DatePicker
                                    selected={expiryDate}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
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

                            {isValid ? (
                                <div className="error-message-column" />
                            ) : (
                                <HeaderH4
                                    text={`${errorName} is invalid`}
                                    className="error-message-column"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
