import {
    checkEmail,
    checkFirstName,
    checkLastName,
    checkPassword,
} from '../InputFields/CheckInput';

export const registerFields = [
    {
        label: 'Email',
        placeholder: 'Enter your email...',
        id: 'registerEmail',
        className: 'field-label',
        dataTestId: 'register-email',
        onChange: checkEmail,
    },
    {
        label: 'First Name',
        placeholder: 'Enter your first name...',
        id: 'registerFirstName',
        className: 'field-label',
        dataTestId: 'first-name',
        onChange: checkFirstName,
    },
    {
        label: 'Last Name',
        placeholder: 'Enter your last name...',
        id: 'registerLastName',
        className: 'field-label',
        dataTestId: 'last-name',
        onChange: checkLastName,
    },
    {
        label: 'Password',
        placeholder: 'Enter your password...',
        id: 'registerPassword',
        className: 'field-label',
        dataTestId: 'register-password',
        onChange: checkPassword,
    },
];
