import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipe } from '../recipe.entity';
import * as fs from 'fs';
import * as path from 'path';
import { constants } from '../../config/constants';

const { DATA, ENCODING } = constants;

@Injectable()
export class RecipesReadService {
    private readonly dataPath = path.join(process.cwd(), DATA.recipe);

    private loadRecipes(): Recipe[] {
        const fileContent = fs.readFileSync(this.dataPath, ENCODING);
        return JSON.parse(fileContent);
    }

    findAll(): Recipe[] {
        const recipes = this.loadRecipes();
        return recipes;
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
