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
  const titleId = `recipe-title-${recipe.id}`;

  return (
    <article
      className={styles.card}
      onClick={() => setIsExpanded(!isExpanded)}
      aria-labelledby={titleId}
    >
      <h3 className={styles.title} id={titleId}>
        <button
          className={styles.titleButton}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          aria-expanded={isExpanded}
        >
          {recipe.name}
          <span aria-hidden="true">{DIFFICULTY_EMOJI[recipe.difficulty]}</span>
        </button>
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
        role="group"
        aria-label={localTexts.rating}
      >
        <span aria-hidden="true">{localTexts.rating}:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(recipe.id, star)}
            className={styles.star}
            aria-label={localTexts.rateStarAria.replace('{{star}}', star.toString())}
            aria-pressed={star <= recipe.rating}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            {star <= recipe.rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(recipe.id);
          }}
          variant={BUTTON_VARIANT.DANGER}
          aria-label={localTexts.deleteAria.replace('{{name}}', recipe.name)}
        >
          {localTexts.deleteCta}
        </Button>
      </div>
    </article>
  );
};
