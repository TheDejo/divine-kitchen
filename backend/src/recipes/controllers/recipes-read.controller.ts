import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesReadService } from '../services/recipes-read.service';
import { GetRecipesDto } from '../dto/get-recipes.dto';

@Controller('recipes')
export class RecipesReadController {
    constructor(private readonly recipesService: RecipesReadService) { }

    @Get()
    findAll(@Query() query: GetRecipesDto) {
        return this.recipesService.findAll(query.page, query.limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findOne(id);
    }
}
