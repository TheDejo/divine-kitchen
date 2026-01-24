import { Test, TestingModule } from '@nestjs/testing';
import { RecipesWriteService } from './recipes-write.service';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs');

describe('RecipesWriteService', () => {
    let service: RecipesWriteService;
    const mockRecipes = [
        { name: 'r1', difficulty: 'easy', rating: 5, cookTimeMinutes: 10 }
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
        it('should create a new recipe and save it', () => {
            const dto = { name: 'New', difficulty: 'easy' as const, rating: 5, cookTimeMinutes: 30 };
            const result = service.create(dto);

            expect(result).toBeDefined();
            expect(result.name).toEqual(dto.name);
            expect(fs.writeFileSync).toHaveBeenCalled();
            // ID should be index + offset. length is 1 before push, so index 1. 1+1=2.
            // Wait, mock returns 1 item (index 0). Push makes it 2 items. New item at index 1.
            // ID = 1 + 1 = 2.
            expect(result.id).toEqual('2');
        });
    });

    describe('update', () => {
        it('should update a recipe and save it', () => {
            const dto = { rating: 4 };
            const result = service.update('1', dto); // ID 1 corresponds to index 0 (1 - 1)

            expect(result.rating).toEqual(4);
            expect(fs.writeFileSync).toHaveBeenCalled();
        });

        it('should throw NotFoundException if id invalid', () => {
            expect(() => service.update('99', {})).toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a recipe and save it', () => {
            service.remove('1'); // ID 1 -> Index 0
            expect(fs.writeFileSync).toHaveBeenCalled();
            const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
            const savedData = JSON.parse(writeCall[1]);
            expect(savedData.length).toBe(0);
        });
    });
});
