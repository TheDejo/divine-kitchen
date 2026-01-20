import { Test, TestingModule } from '@nestjs/testing';
import { RecipesReadService } from './recipes-read.service';

describe('RecipesReadService', () => {
    let service: RecipesReadService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecipesReadService],
        }).compile();

        service = module.get<RecipesReadService>(RecipesReadService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of recipes', () => {
            const recipes = service.findAll();
            expect(recipes).toBeDefined();
            expect(Array.isArray(recipes)).toBe(true);
        });

        it('should paginate results', () => {
            const recipes = service.findAll(1, 2);
            expect(recipes.length).toBeLessThanOrEqual(2);
        });
    });

    describe('findOne', () => {
        it('should return a single recipe', () => {
            expect(service.findOne('1')).toBeDefined();
        });
    });
});
