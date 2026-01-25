import React, { useState } from 'react';
import { CreateRecipeRequest } from '../../services/recipeService';
import { BUTTON_VARIANT, DIFFICULTY } from '../../utils/types';
import { Button } from '../Button/Button';
import styles from './RecipeForm.module.css';

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
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Add New Recipe</h3>
            {error && <div className={styles.error}>Error: {error}</div>}

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={styles.textarea}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="difficulty" className={styles.label}>Difficulty</label>
                <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DIFFICULTY })}
                    className={styles.select}
                >
                    {Object.values(DIFFICULTY).map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="rating" className={styles.label}>Rating (1-5)</label>
                <input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="cookTime" className={styles.label}>Cook Time (minutes)</label>
                <input
                    id="cookTime"
                    type="number"
                    min="1"
                    required
                    value={formData.cookTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, cookTimeMinutes: parseInt(e.target.value) })}
                    className={styles.input}
                />
            </div>

            <div className={styles.actions}>
                <Button
                    type="submit"
                    disabled={submitting}
                    variant={BUTTON_VARIANT.PRIMARY}
                >
                    {submitting ? 'Creating...' : 'Add Recipe'}
                </Button>
            </div>
        </form>
    );
};