# Recipe UI - Frontend

React TypeScript frontend for recipe management.

For docs - https://react.dev/

## Setup

```bash
npm install
npm start
```

Runs on http://localhost:3000

### Configuration

Create a `.env` file in the root of the frontend directory with the following variables:

```env
REACT_APP_ENV=development
```

## Your Tasks

1. Complete the three TODO functions in `src/App.tsx`:
   - `loadRecipes()`
   - `handleRatingChange()`
   - `handleDelete()`
2. Create `src/components/RecipeForm.tsx` component
3. Write tests in `src/components/RecipeCard.test.tsx`
4. Update the `RecipeCard` component to display the recipe description.

## Run Tests

```bash
npm test
```
