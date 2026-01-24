import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../recipe.entity';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import * as fs from 'fs';
import * as path from 'path';
import { constants } from '../../config/constants';

const { DATA, ENCODING, ID_OFFSET } = constants;

@Injectable()
export class RecipesWriteService {
    private readonly dataPath = path.join(process.cwd(), DATA.recipe);

    private loadRawRecipes(): Omit<Recipe, 'id' | 'createdAt'>[] {
        const fileContent = fs.readFileSync(this.dataPath, ENCODING);
        return JSON.parse(fileContent);
    }

    private saveRecipes(recipes: Omit<Recipe, 'id' | 'createdAt'>[]): void {
        fs.writeFileSync(this.dataPath, JSON.stringify(recipes, null, 2), ENCODING);
    }

    create(createRecipeDto: CreateRecipeDto): Recipe {
        const recipes = this.loadRawRecipes();
        const newRecipe = {
            ...createRecipeDto,
        };
        recipes.push(newRecipe);
        this.saveRecipes(recipes);

        return {
            id: (recipes.length - 1 + ID_OFFSET).toString(),
            createdAt: new Date(),
            ...newRecipe,
        };
    }

    update(id: string, updateRecipeDto: UpdateRecipeDto): Recipe {
        const recipes = this.loadRawRecipes();
        const index = parseInt(id) - ID_OFFSET;

        if (index < 0 || index >= recipes.length) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        const updatedRecipe = {
            ...recipes[index],
            ...updateRecipeDto,
        };
        recipes[index] = updatedRecipe;
        this.saveRecipes(recipes);

        return {
            id,
            createdAt: new Date(), // Real app matches DB; here we regenerate or it's transient
            ...updatedRecipe,
        };
    }

    remove(id: string): void {
        const recipes = this.loadRawRecipes();
        const index = parseInt(id) - ID_OFFSET;

        if (index < 0 || index >= recipes.length) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        recipes.splice(index, 1);
        this.saveRecipes(recipes);
    }
}
