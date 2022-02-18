import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

const selectors = {
    menuLink: 'Menu',
    addChipsButton: 'Chips-button',
    basketLink: 'shopping-cart',
    sidesText: 'Sides',
    chipsText: 'Chips',
};

describe('Add item to basket: ', () => {
    beforeEach(() => render(<App />));

    it('Adds chips to the basket when I click the button in the menu', () => {
        const menuLink = screen.getByText(selectors.menuLink);
        fireEvent.click(menuLink);

        const addToBasketButton = screen.getByTestId(selectors.addChipsButton);
        fireEvent.click(addToBasketButton);

        const basketLink = screen.getByTestId(selectors.basketLink);
        fireEvent.click(basketLink);

        waitFor(() => {
            expect(() => screen.findByText(selectors.sidesText)).toBeInTheDocument();
            expect(() => screen.findByText(selectors.chipsText)).toBeInTheDocument();
        });
    });
});
