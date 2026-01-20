import axios from 'axios';

const API_URL = 'http://localhost:3001/api/recipes';

export interface Recipe {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  cookTimeMinutes: number;
  createdAt: string;
}

export interface CreateRecipeRequest {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  cookTimeMinutes: number;
}

export const recipeService = {
  async getAll(difficulty?: string): Promise<Recipe[]> {
    const params = difficulty ? { difficulty } : {};
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  async create(recipe: CreateRecipeRequest): Promise<Recipe> {
    const response = await axios.post(API_URL, recipe);
    return response.data;
  },

  async updateRating(id: string, rating: number): Promise<Recipe> {
    const response = await axios.patch(`${API_URL}/${id}`, { rating });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
