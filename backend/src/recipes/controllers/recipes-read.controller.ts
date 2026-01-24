import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesReadService } from '../services/recipes-read.service';
import { GetRecipesDto } from '../dto/get-recipes.dto';
import { constants } from '../../config/constants';

const { RECIPE_ROUTES } = constants;

@Controller(RECIPE_ROUTES.BASE)
export class RecipesReadController {
    constructor(private readonly recipesService: RecipesReadService) { }

    @Get()
    findAll(@Query() query: GetRecipesDto) {
        return this.recipesService.findAll(query.page, query.limit);
    }

    @Get(RECIPE_ROUTES.BY_ID)
    findOne(@Param(RECIPE_ROUTES.ID_PARAM) id: string) {
        return this.recipesService.findOne(id);
    }
}
