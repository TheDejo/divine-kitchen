import React from 'react';
import { useRecipes } from './utils/hooks/useRecipes';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import { RecipeForm } from './components/RecipeForm/RecipeForm';
import styles from './App.module.css';

function App() {
  const { recipes, loading, error, handleRatingChange, handleDelete, handleCreateRecipe } = useRecipes();

  if (loading) return <div className={styles.loading}>Loading recipes...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🍳 Kitchen Dashboard</h1>

      <RecipeForm createRecipe={handleCreateRecipe} />

      <div className={styles.recipeList}>
        <h2 className={styles.subtitle}>Your Recipes ({recipes.length})</h2>
        {recipes.length === 0 ? (
          <p className={styles.emptyState}>No recipes yet. Add your first recipe above!</p>
        ) : (
          recipes.map((recipe: import('./services/recipeService').Recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRatingChange={handleRatingChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
