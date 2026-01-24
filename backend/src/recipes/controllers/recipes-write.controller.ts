import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesWriteService } from '../services/recipes-write.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { constants } from '../../config/constants';

const { RECIPE_ROUTES } = constants;

@Controller(RECIPE_ROUTES.BASE)
export class RecipesWriteController {
    constructor(private readonly recipesService: RecipesWriteService) { }

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Patch(RECIPE_ROUTES.BY_ID)
    update(@Param(RECIPE_ROUTES.ID_PARAM) id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(id, updateRecipeDto);
    }

    @Delete(RECIPE_ROUTES.BY_ID)
    remove(@Param(RECIPE_ROUTES.ID_PARAM) id: string) {
        return this.recipesService.remove(id);
    }
}
