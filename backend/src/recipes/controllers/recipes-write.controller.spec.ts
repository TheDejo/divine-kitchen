import { Test, TestingModule } from '@nestjs/testing';
import { RecipesWriteController } from './recipes-write.controller';
import { RecipesWriteService } from '../services/recipes-write.service';

describe('RecipesWriteController', () => {
    let controller: RecipesWriteController;

    const mockRecipesService = {
        create: jest.fn().mockReturnValue({}),
        update: jest.fn().mockReturnValue({}),
        remove: jest.fn().mockReturnValue(undefined),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RecipesWriteController],
            providers: [
                {
                    provide: RecipesWriteService,
                    useValue: mockRecipesService,
                },
            ],
        }).compile();

        controller = module.get<RecipesWriteController>(RecipesWriteController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new recipe', async () => {
            const dto = {
                name: 'Test',
                difficulty: 'easy' as const,
                rating: 5,
                cookTimeMinutes: 30,
                description: 'Description',
                steps: [],
                cookingCompleted: false
            };
            expect(await controller.create(dto)).toEqual({});
            expect(mockRecipesService.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('update', () => {
        it('should update a recipe', async () => {
            const dto = { rating: 4 };
            expect(await controller.update('1', dto)).toEqual({});
            expect(mockRecipesService.update).toHaveBeenCalledWith('1', dto);
        });
    });

    describe('remove', () => {
        it('should remove a recipe', async () => {
            expect(await controller.remove('1')).toBeUndefined();
            expect(mockRecipesService.remove).toHaveBeenCalledWith('1');
        });
    });
});
