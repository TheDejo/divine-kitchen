import { Injectable } from '@nestjs/common';
import { Recipe } from '../recipe.entity';

@Injectable()
export class RecipesReadService {
    findAll(): Recipe[] {
        return [
            {
                "id": '1',
                "name": "meringue",
                "difficulty": "medium",
                "rating": 3,
                "cookTimeMinutes": 60,
                "createdAt": new Date()
            }
        ];
    }

    findOne(id: string): Recipe {
        return ({
            "id": id,
            "name": "meringue",
            "difficulty": "medium",
            "rating": 3,
            "cookTimeMinutes": 60,
            "createdAt": new Date()
        });
    }
}
