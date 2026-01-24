export interface RecipeStep {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number; // 1-5
  cookTimeMinutes: number;
  steps: RecipeStep[];
  cookingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
