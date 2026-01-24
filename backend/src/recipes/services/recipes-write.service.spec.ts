import { Test, TestingModule } from '@nestjs/testing';
import { RecipesWriteService } from './recipes-write.service';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs');

describe('RecipesWriteService', () => {
    let service: RecipesWriteService;
    const mockRecipes = [
        {
            id: '10',
            name: 'r1',
            difficulty: 'easy',
            rating: 5,
            cookTimeMinutes: 10,
            description: 'desc',
            steps: [{ id: 's1', description: 'step1', isCompleted: false }],
            cookingCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '20',
            name: 'r2',
            difficulty: 'easy',
            rating: 5,
            cookTimeMinutes: 10,
            description: 'desc',
            steps: [],
            cookingCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecipesWriteService],
        }).compile();

        service = module.get<RecipesWriteService>(RecipesWriteService);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockRecipes));
        (fs.writeFileSync as jest.Mock).mockClear();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        describe('Happy Path', () => {
            it('should create a new recipe with generated IDs (recipe + steps)', () => {
                const dto = {
                    name: 'New',
                    difficulty: 'easy' as const,
                    rating: 5,
                    cookTimeMinutes: 30,
                    description: 'Description',
                    steps: [{ description: 'New Step', isCompleted: false }],
                    cookingCompleted: false
                };
                const result = service.create(dto);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.steps[0].id).toBeDefined();
                expect(result.steps[0].description).toEqual('New Step');
                expect(fs.writeFileSync).toHaveBeenCalled();
            });
        });
    });

    describe('update', () => {
        describe('Happy Path', () => {
            it('should update a recipe by ID', () => {
                const dto = { rating: 1 };
                const result = service.update('20', dto);

                expect(result.rating).toEqual(1);
                expect(result.id).toEqual('20');
                expect(fs.writeFileSync).toHaveBeenCalled();
            });

            it('should auto-generate IDs for new steps in update', () => {
                const dto = { steps: [{ description: 'Updated Step', isCompleted: false }] };
                const result = service.update('20', dto);
                expect(result.steps[0].id).toBeDefined();
            });
        });

        describe('Error Path', () => {
            it('should throw NotFoundException if id invalid', () => {
                expect(() => service.update('99', {})).toThrow(NotFoundException);
            });
        });
    });

    describe('remove', () => {
        describe('Happy Path', () => {
            it('should remove a recipe by ID', () => {
                service.remove('20');
                expect(fs.writeFileSync).toHaveBeenCalled();
                const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
                const savedData = JSON.parse(writeCall[1]);
                expect(savedData.length).toBe(1);
                expect(savedData[0].id).toBe('10');
            });
        });

        describe('Error Path', () => {
            it('should throw NotFoundException if id invalid', () => {
                expect(() => service.remove('99')).toThrow(NotFoundException);
            });
        });
    });
});
