import { IsString, IsNotEmpty, IsNumber, Min, Max, IsIn, ValidateNested, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeStepDto } from './recipe-step.dto';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNumber()
  @Min(1)
  cookTimeMinutes: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeStepDto)
  steps: RecipeStepDto[];

  @IsBoolean()
  @IsOptional()
  cookingCompleted?: boolean;
}
