import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipesWriteService } from '../services/recipes-write.service';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';

@Controller('recipes')
export class RecipesWriteController {
    constructor(private readonly recipesService: RecipesWriteService) { }

    @Post()
    create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipesService.update(id, updateRecipeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recipesService.remove(id);
    }
}
