import React, { useState, useEffect } from 'react';
import { recipeService, Recipe } from './services/recipeService';
import { RecipeCard } from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement loadRecipes function
  // This function should:
  // 1. Set loading to true
  // 2. Call recipeService.getAll()
  // 3. Update the recipes state
  // 4. Handle any errors
  // 5. Set loading to false
  const loadRecipes = async () => {
    // YOUR CODE HERE
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // TODO: Implement handleRatingChange
  // This function should:
  // 1. Call recipeService.updateRating()
  // 2. Reload recipes after successful update
  // 3. Handle any errors
  const handleRatingChange = async (id: string, rating: number) => {
    // YOUR CODE HERE
  };

  // TODO: Implement handleDelete
  // This function should:
  // 1. Call recipeService.delete()
  // 2. Reload recipes after successful delete
  // 3. Handle any errors
  const handleDelete = async (id: string) => {
    // YOUR CODE HERE
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading recipes...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>🍳 Kitchen Dashboard</h1>

      {/* TODO: Add your RecipeForm component here */}
      {/* The form should collect: name, difficulty, rating, cookTimeMinutes */}
      {/* After submission, it should call recipeService.create() and reload recipes */}

      <div style={{ marginTop: '24px' }}>
        <h2>Your Recipes ({recipes.length})</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet. Add your first recipe above!</p>
        ) : (
          recipes.map((recipe) => (
            /* TODO Update the RecipeCard component to also display the description */ 
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
