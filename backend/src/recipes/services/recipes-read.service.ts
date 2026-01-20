import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../recipe.entity';
import * as fs from 'fs';
import * as path from 'path';
import { constants } from '../../config/constants';

const { DEFAULT_PAGE, DEFAULT_LIMIT, ID_OFFSET, DATA, ENCODING } = constants;

@Injectable()
export class RecipesReadService {
    private readonly dataPath = path.join(process.cwd(), DATA.recipe);

    private loadRecipes(): Recipe[] {
        const fileContent = fs.readFileSync(this.dataPath, ENCODING);
        const rawRecipes = JSON.parse(fileContent);
        return rawRecipes.map((recipe: Recipe, index: number) => ({
            id: (index + ID_OFFSET).toString(),
            ...recipe,
            createdAt: new Date(),
        }));
    }

    findAll(page: number = DEFAULT_PAGE, limit: number = DEFAULT_LIMIT): Recipe[] {
        const recipes = this.loadRecipes();
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return recipes.slice(startIndex, endIndex);
    }

    findOne(id: string): Recipe {
        const recipes = this.loadRecipes();
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }
        return recipe;
    }
}
