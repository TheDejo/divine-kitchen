import React from 'react';
import { Recipe } from '../../services/recipeService';
import { BUTTON_VARIANT, DIFFICULTY_EMOJI } from '../../utils/types';
import { Button } from '../Button/Button';
import localTexts from './Recipe.texts.json';
import styles from './RecipeCard.module.css';

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
      className={styles.card}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h3 className={styles.title}>
        {recipe.name}
        <span>{DIFFICULTY_EMOJI[recipe.difficulty]}</span>
      </h3>
      <p className={styles.meta}>
        {localTexts.difficulty} <strong>{recipe.difficulty}</strong> {localTexts.cookTime.replace('{{cookTimeMinutes}}', recipe.cookTimeMinutes.toString())}
      </p>

      {isExpanded && recipe.description && (
        <p className={styles.description}>
          {recipe.description}
        </p>
      )}

      <div
        className={styles.ratingContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <span>{localTexts.rating}:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRatingChange(recipe.id, star)}
            className={styles.star}
          >
            {star <= recipe.rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(recipe.id);
          }}
          variant={BUTTON_VARIANT.DANGER}
        >
          {localTexts.deleteCta}
        </Button>
      </div>
    </article>
  );
};
