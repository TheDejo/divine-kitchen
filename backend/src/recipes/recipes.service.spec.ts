import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO: Write tests
  describe('create', () => {
    it('should create a recipe with all required fields', () => {
      const recipe = service.create({
        "name": "meringue",
        "difficulty": "medium",
        "rating": 3,
        "cookTimeMinutes": 60
      });

      expect(recipe).toEqual({
        "id": '1',
        "name": "meringue",
        "difficulty": "medium",
        "rating": 3,
        "cookTimeMinutes": 60,
        "createdAt": new Date()
      });
    });
  });

});
