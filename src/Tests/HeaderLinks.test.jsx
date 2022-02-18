import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

const selectors = {
    headers: ['Menu', 'Register'],
    menuSubHeaders: ['Burgers', 'Sides', 'Drinks'],
    emailPlaceholder: 'Enter your email...',
    basketIcon: 'shopping-cart',
    basket: 'Basket',
};

describe('Header: ', () => {
    beforeEach(() => render(<App />));

    it('Renders the header', () => {
        selectors.headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    it('Takes me to the menu page when I click the link', () => {
        const menuLink = screen.getByText(selectors.headers[0]);
        fireEvent.click(menuLink);

        selectors.menuSubHeaders.forEach((subheader) => {
            expect(screen.getByText(subheader)).toBeInTheDocument();
        });
    });

    it('Takes me to the register page when I click the link', async () => {
        const registerLink = screen.getByText(selectors.headers[1]);
        fireEvent.click(registerLink);

        const placeHolderText = await screen.findByPlaceholderText(selectors.emailPlaceholder);
        await waitFor(() => expect(placeHolderText).toBeInTheDocument());
    });

    it('Takes me to the basket page when I click the link', async () => {
        const basketLink = screen.getByTestId(selectors.basketIcon);
        fireEvent.click(basketLink);

        const basketHeader = await screen.findByText(selectors.basket);
        await waitFor(() => expect(basketHeader).toBeInTheDocument());
    });
});
