import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { RecipeCard } from './RecipeCard';
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
  };

  const mockOnRatingChange = jest.fn();
  const mockOnDelete = jest.fn();

  // TODO: Write a test that verifies the component renders correctly
  // Test should check that the recipe name and details are displayed
  it('should render recipe details', () => {
    // YOUR CODE HERE
  });

  // Optional: Add more tests if you have time
});
