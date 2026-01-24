import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe, RecipeStep } from '../recipe.entity';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import * as fs from 'fs';
import * as path from 'path';
import { constants } from '../../config/constants';
import * as crypto from 'crypto';

const { DATA, ENCODING, JSON_SPACING } = constants;

@Injectable()
export class RecipesWriteService {
    private readonly dataPath = path.join(process.cwd(), DATA.recipe);

    private loadRecipes(): Recipe[] {
        const fileContent = fs.readFileSync(this.dataPath, ENCODING);
        return JSON.parse(fileContent);
    }

    private saveRecipes(recipes: Recipe[]): void {
        fs.writeFileSync(this.dataPath, JSON.stringify(recipes, null, JSON_SPACING), ENCODING);
    }

    private generateStepIds(steps: any[]): RecipeStep[] {
        return steps.map(step => ({
            ...step,
            id: crypto.randomUUID(),
        }));
    }

    create(createRecipeDto: CreateRecipeDto): Recipe {
        const recipes = this.loadRecipes();
        const now = new Date();
        const newId = crypto.randomUUID();

        const newRecipe: Recipe = {
            id: newId,
            ...createRecipeDto,
            steps: this.generateStepIds(createRecipeDto.steps || []),
            cookingCompleted: createRecipeDto.cookingCompleted ?? false,
            createdAt: now,
            updatedAt: now,
        };

        recipes.push(newRecipe);
        this.saveRecipes(recipes);

        return newRecipe;
    }

    update(id: string, updateRecipeDto: UpdateRecipeDto): Recipe {
        const recipes = this.loadRecipes();
        const index = recipes.findIndex(r => r.id === id);

        if (index === -1) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        const now = new Date();

        let updatedSteps = recipes[index].steps;
        if (updateRecipeDto.steps) {
            updatedSteps = this.generateStepIds(updateRecipeDto.steps);
        }

        const updatedRecipe = {
            ...recipes[index],
            ...updateRecipeDto,
            steps: updatedSteps,
            updatedAt: now,
        };
        recipes[index] = updatedRecipe;
        this.saveRecipes(recipes);

        return updatedRecipe;
    }

    remove(id: string): void {
        const recipes = this.loadRecipes();
        const index = recipes.findIndex(r => r.id === id);

        if (index === -1) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        recipes.splice(index, 1);
        this.saveRecipes(recipes);
    }
}
