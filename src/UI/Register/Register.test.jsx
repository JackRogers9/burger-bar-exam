import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Register from './Register';

const selectors = {
    registerButton: 'register-button',
    loginButton: 'login-button',
    loginHeader: 'Login',
};

const fieldValues = [
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

describe('Register: ', () => {
    beforeEach(() =>
        render(
            <Router>
                <Register />
            </Router>
        )
    );

    it('Redirects to the login page after registering', async () => {
        fieldValues.forEach((data) => {
            const { id, value } = data;

            const field = screen.getByTestId(id);
            fireEvent.change(field, { target: { value } });
        });

        const registerButton = screen.getByTestId(selectors.registerButton);
        fireEvent.click(registerButton);

        waitFor(() => expect(screen.findByText(selectors.loginHeader)).toBeInTheDocument());
        waitFor(() => expect(screen.findByTestId(selectors.loginButton)).toBeInTheDocument());
    });
});
