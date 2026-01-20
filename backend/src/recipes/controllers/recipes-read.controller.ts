import { Controller, Get, Param } from '@nestjs/common';
import { RecipesReadService } from '../services/recipes-read.service';

@Controller('recipes')
export class RecipesReadController {
    constructor(private readonly recipesService: RecipesReadService) { }

    @Get()
    findAll() {
        return this.recipesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recipesService.findOne(id);
    }
}
