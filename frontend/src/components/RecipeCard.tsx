import React from 'react';
import { Recipe } from '../services/recipeService';

interface RecipeCardProps {
  recipe: Recipe;
  onRatingChange: (id: string, rating: number) => void;
  onDelete: (id: string) => void;
}

/* TODO Update the RecipeCard component to also display the description */ 
export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onRatingChange,
  onDelete,
}) => {
  const difficultyEmoji = {
    easy: '😊',
    medium: '🤔',
    hard: '😰',
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <h3>
        {recipe.name} {difficultyEmoji[recipe.difficulty]}
      </h3>
      <p>
        Difficulty: <strong>{recipe.difficulty}</strong> | Cook Time:{' '}
        {recipe.cookTimeMinutes} min
      </p>
      <div>
        Rating:{' '}
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRatingChange(recipe.id, star)}
            style={{ cursor: 'pointer', fontSize: '20px', marginLeft: '4px' }}
          >
            {star <= recipe.rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>
      <button
        onClick={() => onDelete(recipe.id)}
        style={{
          marginTop: '8px',
          background: '#ff4444',
          color: 'white',
          padding: '6px 12px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
};
