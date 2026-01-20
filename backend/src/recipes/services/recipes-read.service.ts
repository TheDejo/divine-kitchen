import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../recipe.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RecipesReadService {
    private readonly dataPath = path.join(process.cwd(), 'data/recipes.json');

    private loadRecipes(): Recipe[] {
        const fileContent = fs.readFileSync(this.dataPath, 'utf8');
        const rawRecipes = JSON.parse(fileContent);
        return rawRecipes.map((recipe: Recipe, index: number) => ({
            id: (index + 1).toString(),
            ...recipe,
            createdAt: new Date(),
        }));
    }

    findAll(page: number = 1, limit: number = 10): Recipe[] {
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
