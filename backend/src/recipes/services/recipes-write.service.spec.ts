import { Test, TestingModule } from '@nestjs/testing';
import { RecipesWriteService } from './recipes-write.service';

describe('RecipesWriteService', () => {
    let service: RecipesWriteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecipesWriteService],
        }).compile();

        service = module.get<RecipesWriteService>(RecipesWriteService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should return a new recipe', () => {
            const dto = { name: 'Test', difficulty: 'easy' as const, rating: 5, cookTimeMinutes: 30 };
            expect(service.create(dto)).toBeDefined();
        });
    });

    describe('update', () => {
        it('should return an updated recipe', () => {
            const dto = { rating: 4 };
            expect(service.update('1', dto)).toBeDefined();
        });
    });

    describe('remove', () => {
        it('should return void', () => {
            expect(service.remove('1')).toBeUndefined();
        });
    });
});
