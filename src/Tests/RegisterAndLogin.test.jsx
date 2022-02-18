import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Register from '../UI/Register/Register';
import Login from '../UI/Login/Login';

const selectors = {
    registerButton: 'register-button',
    loginButton: 'login-button',
    loginHeader: 'Login',
    homeHeader: `Ronnie's Burger Bar`,
    openingHoursHeader: 'OPENING DETAILS',
    previousOrdersHeader: 'Previous Orders',
};

const registerFieldValues = [
    {
        id: 'register-email',
        value: 'testEmail@iress.com',
    },
    {
        id: 'register-password',
        value: 'TestPassword1!',
    },
    {
        id: 'first-name',
        value: 'user',
    },
    {
        id: 'last-name',
        value: 'name',
    },
    {
        id: 'card-number-field',
        value: '4100000000000000',
    },
    {
        id: 'sort-code-field',
        value: '111111',
    },
    {
        id: 'cvc-field',
        value: '111',
    },
];

const loginFieldValues = [
    {
        id: 'login-email',
        value: 'testEmail@iress.com',
    },
    {
        id: 'login-password',
        value: 'TestPassword1!',
    },
];

describe('Register: ', () => {
    const returnInputFieldValues = (fieldValues) => {
        fieldValues.forEach((data) => {
            const { id, value } = data;

            const field = screen.getByTestId(id);
            fireEvent.change(field, { target: { value } });
        });
    };

    it('Redirects to the login page after registering', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        returnInputFieldValues(registerFieldValues);

        const registerButton = screen.getByTestId(selectors.registerButton);
        fireEvent.click(registerButton);

        waitFor(() => {
            expect(screen.findByText(selectors.loginHeader)).toBeInTheDocument();
            expect(screen.findByTestId(selectors.loginButton)).toBeInTheDocument();
        });
    });

    it('Redirects to the home page after logging in', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        returnInputFieldValues(loginFieldValues);

        waitFor(() => {
            expect(screen.findByText(selectors.homeHeader)).toBeInTheDocument();
            expect(screen.findByTestId(selectors.openingHoursHeader)).toBeInTheDocument();
            expect(screen.findByText(selectors.previousOrdersHeader)).toBeInTheDocument();
        });
    });
});
