import axios from 'axios';
import { DIFFICULTY } from '../utils/types';
import { constants } from '../config/constants';

const { API_URL } = constants;

export interface Recipe {
  id: string;
  name: string;
  difficulty: DIFFICULTY;
  rating: number;
  cookTimeMinutes: number;
  createdAt: string;
}

export interface CreateRecipeRequest {
  name: string;
  difficulty: DIFFICULTY;
  rating: number;
  cookTimeMinutes: number;
}

export const recipeService = {
  async getAll(difficulty?: string): Promise<Recipe[]> {
    const params = difficulty ? { difficulty } : {};
    const response = await axios.get(API_URL.recipes, { params });
    return response.data;
  },

  async create(recipe: CreateRecipeRequest): Promise<Recipe> {
    const response = await axios.post(API_URL.recipes, recipe);
    return response.data;
  },

  async updateRating(id: string, rating: number): Promise<Recipe> {
    const response = await axios.patch(API_URL.recipeById.replace('%id%', id), { rating });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(API_URL.recipeById.replace('%id%', id));
  },
};
