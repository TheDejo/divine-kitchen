import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
