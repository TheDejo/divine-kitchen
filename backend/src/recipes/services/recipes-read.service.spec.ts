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
            expect(service.findAll()).toBeDefined();
            expect(Array.isArray(service.findAll())).toBe(true);
        });
    });

    describe('findOne', () => {
        it('should return a single recipe', () => {
            expect(service.findOne('1')).toBeDefined();
        });
    });
});
