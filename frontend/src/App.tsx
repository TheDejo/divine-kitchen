import React from 'react';
import { useRecipes } from './utils/hooks/useRecipes';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import { RecipeForm } from './components/RecipeForm/RecipeForm';

function App() {
  const { recipes, loading, error, handleRatingChange, handleDelete, handleCreateRecipe } = useRecipes();

  if (loading) return <div style={{ padding: '20px' }}>Loading recipes...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>🍳 Kitchen Dashboard</h1>

      <RecipeForm createRecipe={handleCreateRecipe} />

      <div style={{ marginTop: '24px' }}>
        <h2>Your Recipes ({recipes.length})</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet. Add your first recipe above!</p>
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
    </div>
  );
}

export default App;
