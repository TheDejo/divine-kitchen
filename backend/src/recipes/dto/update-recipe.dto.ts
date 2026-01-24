import { IsNumber, Min, Max, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cookTimeMinutes?: number;
}
