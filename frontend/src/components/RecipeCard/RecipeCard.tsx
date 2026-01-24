import React from 'react';
import { Recipe } from '../../services/recipeService';
import { BUTTON_VARIANT, DIFFICULTY_EMOJI } from '../../utils/types';
import { Button } from '../Button/Button';
interface RecipeCardProps {
  recipe: Recipe;
  onRatingChange: (id: string, rating: number) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onRatingChange,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <h3>
        {recipe.name} {DIFFICULTY_EMOJI[recipe.difficulty]}
      </h3>
      <p>
        Difficulty: <strong>{recipe.difficulty}</strong> | Cook Time:{' '}
        {recipe.cookTimeMinutes} min
      </p>

      {isExpanded && recipe.description && (
        <p style={{ fontStyle: 'italic', color: '#555', margin: '10px 0' }}>
          {recipe.description}
        </p>
      )}

      <div onClick={(e) => e.stopPropagation()}>
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
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(recipe.id);
        }}
        variant={BUTTON_VARIANT.DANGER}
        style={{ marginTop: '8px' }}
      >
        Delete
      </Button>
    </article>
  );
};
