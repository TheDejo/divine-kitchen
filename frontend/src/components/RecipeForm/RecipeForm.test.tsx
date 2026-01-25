import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RecipeForm } from './RecipeForm';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('RecipeForm', () => {
    const mockCreateRecipe = jest.fn();

    const renderComponent = () => {
        return render(<RecipeForm createRecipe={mockCreateRecipe} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Happy Path', () => {
        it('should submit form with valid data and reset fields', async () => {
            mockCreateRecipe.mockResolvedValue({});
            renderComponent();

            const nameInput = screen.getByLabelText(/Name/i);
            const descriptionInput = screen.getByLabelText(/Description/i);
            const ratingInput = screen.getByLabelText(/Rating/i);
            const cookTimeInput = screen.getByLabelText(/Cook Time/i);
            const submitBtn = screen.getByRole('button', { name: /Add Recipe/i });

            userEvent.type(nameInput, 'New Recipe');
            userEvent.type(descriptionInput, 'Tasty description');
            userEvent.clear(ratingInput);
            userEvent.type(ratingInput, '4');
            userEvent.clear(cookTimeInput);
            userEvent.type(cookTimeInput, '45');

            userEvent.click(submitBtn);

            expect(await screen.findByText(/Creating.../i)).toBeInTheDocument();

            expect(mockCreateRecipe).toHaveBeenCalledWith({
                name: 'New Recipe',
                description: 'Tasty description',
                difficulty: 'easy',
                rating: 4,
                cookTimeMinutes: 45,
            });

            await waitFor(() => {
                expect(nameInput).toHaveValue('');
                expect(descriptionInput).toHaveValue('');
                expect(screen.queryByText(/Creating.../i)).not.toBeInTheDocument();
            });
        });
    });

    describe('Error Path', () => {
        it('should display error message on failure', async () => {
            const errorMessage = 'Failed to create';
            mockCreateRecipe.mockRejectedValue(new Error(errorMessage));

            renderComponent();

            const nameInput = screen.getByLabelText(/Name/i);
            const submitBtn = screen.getByRole('button', { name: /Add Recipe/i });

            userEvent.type(nameInput, 'Fail Recipe');
            userEvent.click(submitBtn);

            await waitFor(() => {
                expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
            });

            expect(nameInput).toHaveValue('Fail Recipe');
        });
    });

    it('should have no accessibility violations', async () => {
        const { container } = renderComponent();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
