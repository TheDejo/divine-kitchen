import { Injectable } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  create(createRecipeDto: CreateRecipeDto): Recipe {
    //TODO: Implement actual creation logic (e.g., save)
    return ({
      "id": '1',
      "name": "meringue",
      "difficulty": "medium",
      "rating": 3,
      "cookTimeMinutes": 60,
      "createdAt": new Date()
    });
  }
}
