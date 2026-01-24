import React, { useState } from 'react';
import { CreateRecipeRequest } from '../../services/recipeService';
import { BUTTON_VARIANT, DIFFICULTY } from '../../utils/types';
import { Button } from '../Button/Button';

interface RecipeFormProps {
    createRecipe: (recipe: CreateRecipeRequest) => Promise<void>;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ createRecipe }) => {
    const [formData, setFormData] = useState<CreateRecipeRequest>({
        name: '',
        description: '',
        difficulty: DIFFICULTY.EASY,
        rating: 5,
        cookTimeMinutes: 30,
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await createRecipe(formData);
            setFormData({
                name: '',
                description: '',
                difficulty: DIFFICULTY.EASY,
                rating: 5,
                cookTimeMinutes: 30,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create recipe');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', marginBottom: '24px' }}>
            <h3>Add New Recipe</h3>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</div>}

            <div style={{ marginBottom: '12px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '80px' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label htmlFor="difficulty" style={{ display: 'block', marginBottom: '4px' }}>Difficulty</label>
                <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DIFFICULTY })}
                    style={{ width: '100%', padding: '8px' }}
                >
                    {Object.values(DIFFICULTY).map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label htmlFor="rating" style={{ display: 'block', marginBottom: '4px' }}>Rating (1-5)</label>
                <input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label htmlFor="cookTime" style={{ display: 'block', marginBottom: '4px' }}>Cook Time (minutes)</label>
                <input
                    id="cookTime"
                    type="number"
                    min="1"
                    required
                    value={formData.cookTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, cookTimeMinutes: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <Button
                type="submit"
                disabled={submitting}
                variant={BUTTON_VARIANT.PRIMARY}
            >
                {submitting ? 'Creating...' : 'Add Recipe'}
            </Button>
        </form>
    );
};