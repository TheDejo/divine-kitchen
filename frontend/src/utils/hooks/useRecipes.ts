import useSWR from 'swr';
import { recipeService, Recipe, CreateRecipeRequest } from '../../services/recipeService';
import { constants } from '../../config/constants';

const { API_URL } = constants;

export const useRecipes = () => {
    const { data: recipes = [], error, isLoading, mutate } = useSWR<Recipe[]>(
        API_URL.recipes,
        () => recipeService.getAll()
    );

    const handleCreateRecipe = async (recipe: CreateRecipeRequest) => {
        try {
            await recipeService.create(recipe);
            mutate();
        } catch (err) {
            console.error('Failed to create recipe:', err);
            throw err;
        }
    };

    const handleRatingChange = async (id: string, rating: number) => {
        try {
            await recipeService.updateRating(id, rating);
            mutate();
        } catch (err) {
            console.error('Failed to update rating:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await recipeService.delete(id);
            mutate();
        } catch (err) {
            console.error('Failed to delete recipe:', err);
        }
    };

    return {
        recipes,
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : 'Failed to load recipes') : null,
        handleCreateRecipe,
        handleRatingChange,
        handleDelete,
        refreshRecipes: mutate
    };
};
