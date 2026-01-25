import { Test, TestingModule } from '@nestjs/testing';
import { RecipesReadController } from './recipes-read.controller';
import { RecipesReadService } from '../services/recipes-read.service';

describe('RecipesReadController', () => {
    let controller: RecipesReadController;

    const mockRecipesService = {
        findAll: jest.fn().mockReturnValue([]),
        findOne: jest.fn().mockReturnValue({}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RecipesReadController],
            providers: [
                {
                    provide: RecipesReadService,
                    useValue: mockRecipesService,
                },
            ],
        }).compile();

        controller = module.get<RecipesReadController>(RecipesReadController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of recipes', async () => {
            expect(await controller.findAll()).toEqual([]);
            expect(mockRecipesService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single recipe', async () => {
            expect(await controller.findOne('1')).toEqual({});
            expect(mockRecipesService.findOne).toHaveBeenCalledWith('1');
        });
    });
});
