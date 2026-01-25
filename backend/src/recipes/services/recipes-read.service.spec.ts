import { Test, TestingModule } from '@nestjs/testing';
import { RecipesReadService } from './recipes-read.service';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs');

describe('RecipesReadService', () => {
    let service: RecipesReadService;
    const mockRecipes = [
        { id: '1', name: 'recipe1', difficulty: 'easy', rating: 5, cookTimeMinutes: 10 },
        { id: '2', name: 'recipe2', difficulty: 'medium', rating: 4, cookTimeMinutes: 20 },
        { id: '3', name: 'recipe3', difficulty: 'hard', rating: 3, cookTimeMinutes: 30 }
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecipesReadService],
        }).compile();

        service = module.get<RecipesReadService>(RecipesReadService);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockRecipes));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all recipes', () => {
            const recipes = service.findAll();
            expect(recipes).toBeDefined();
            expect(Array.isArray(recipes)).toBe(true);
            expect(recipes.length).toBe(3);
        });
    });

    describe('findOne', () => {
        describe('Happy Path', () => {
            it('should return a single recipe', () => {
                expect(service.findOne('1')).toBeDefined();
                expect(service.findOne('1').id).toBe('1');
            });
        });

        describe('Error Path', () => {
            it('should throw NotFoundException if not found', () => {
                expect(() => service.findOne('999')).toThrow(NotFoundException);
            });
        });
    });
});
