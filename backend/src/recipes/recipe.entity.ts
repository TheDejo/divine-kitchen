export interface Recipe {
  id: string; // UUID
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number; // 1-5
  cookTimeMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
