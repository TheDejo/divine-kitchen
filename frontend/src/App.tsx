import React from 'react';
import { useRecipes } from './utils/hooks/useRecipes';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import { RecipeForm } from './components/RecipeForm/RecipeForm';
import localTexts from './App.texts.json';
import styles from './App.module.css';

function App() {
  const { recipes, loading, error, handleRatingChange, handleDelete, handleCreateRecipe } = useRecipes();

  if (loading) return <div className={styles.loading}>{localTexts.loadingRecipes}</div>;
  if (error) return <div className={styles.error}>{localTexts.errorLoadingRecipes.replace('{{recipeError}}', error)}</div>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{localTexts.title}</h1>

      <RecipeForm createRecipe={handleCreateRecipe} />

      <div className={styles.recipeList}>
        <h2 className={styles.subtitle}>{localTexts.subtitle.replace('{{recipesLength}}', recipes.length.toString())}</h2>
        {!recipes.length ? (
          <p className={styles.emptyState}>{localTexts.emptyState}</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRatingChange={handleRatingChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default App;
