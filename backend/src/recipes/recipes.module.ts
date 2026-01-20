import { Module } from '@nestjs/common';
import { RecipesReadService } from './services/recipes-read.service';
import { RecipesWriteService } from './services/recipes-write.service';
import { RecipesReadController } from './controllers/recipes-read.controller';
import { RecipesWriteController } from './controllers/recipes-write.controller';

@Module({
  controllers: [RecipesReadController, RecipesWriteController],
  providers: [RecipesReadService, RecipesWriteService],
})
export class RecipesModule { }
