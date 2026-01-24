export interface Recipe {
  id: string;
  name: string;
  description?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  cookTimeMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
