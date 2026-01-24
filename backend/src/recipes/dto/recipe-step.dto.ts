import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RecipeStepDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    isCompleted: boolean;
}
