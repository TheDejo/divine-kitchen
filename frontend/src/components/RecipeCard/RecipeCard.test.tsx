import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../../services/recipeService';
import { DIFFICULTY } from '../../utils/types';

describe('RecipeCard', () => {
  const mockRecipe: Recipe = {
    id: '1',
    name: 'Pasta Carbonara',
    difficulty: DIFFICULTY.MEDIUM,
    rating: 4,
    cookTimeMinutes: 30,
    createdAt: new Date().toISOString(),
    description: 'Delicious creamy pasta',
  };

  const mockOnRatingChange = jest.fn();
  const mockOnDelete = jest.fn();

  const renderComponent = (props: Partial<React.ComponentProps<typeof RecipeCard>> = {}) => {
    const defaultProps = {
      recipe: mockRecipe,
      onRatingChange: mockOnRatingChange,
      onDelete: mockOnDelete,
      ...props,
    };

    return render(<RecipeCard {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render recipe details', () => {
    renderComponent();
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
    expect(screen.getByText('🤔')).toBeInTheDocument();
    expect(screen.getByText(/Difficulty:/)).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText(/30 min/)).toBeInTheDocument();
  });

  it('should toggle description on click', async () => {
    renderComponent();

    expect(screen.queryByText('Delicious creamy pasta')).not.toBeInTheDocument();

    const article = screen.getByRole('article');
    userEvent.click(article);
    expect(await screen.findByText('Delicious creamy pasta')).toBeVisible();

    userEvent.click(article);
    await waitFor(() => {
      expect(screen.queryByText('Delicious creamy pasta')).not.toBeInTheDocument();
    });
  });

  it('should call onDelete when delete button is clicked', () => {
    renderComponent();

    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    userEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(screen.queryByText('Delicious creamy pasta')).not.toBeInTheDocument();
  });

  it('should call onRatingChange when a star is clicked', () => {
    renderComponent();
    const stars = screen.getAllByText(/[⭐☆]/);
    userEvent.click(stars[4]);

    expect(mockOnRatingChange).toHaveBeenCalledWith('1', 5);
    expect(screen.queryByText('Delicious creamy pasta')).not.toBeInTheDocument();
  });
});
