import { Injectable } from '@nestjs/common';
import { Recipe } from '../recipe.entity';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';

@Injectable()
export class RecipesWriteService {
    create(createRecipeDto: CreateRecipeDto): Recipe {
        return ({
            "id": '1',
            "name": "meringue",
            "difficulty": "medium",
            "rating": 3,
            "cookTimeMinutes": 60,
            "createdAt": new Date()
        });
    }

    update(id: string, updateRecipeDto: UpdateRecipeDto): Recipe {
        return ({
            "id": id,
            "name": "meringue",
            "difficulty": "medium",
            "rating": updateRecipeDto.rating ?? 3,
            "cookTimeMinutes": 60,
            "createdAt": new Date()
        });
    }

    remove(id: string): void {
        return;
    }
}
