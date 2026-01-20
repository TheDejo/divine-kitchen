# Full Stack Engineer Take-Home Test

## 🍳 Recipe API & Kitchen Dashboard

Build a simple recipe management system where chefs can store and rate recipes.

##  Before You Begin
**Time Expectation**: This test is designed to take around 2 hours. We value your time and don't expect you to spend an entire day on this.
**Incomplete is OK**: If you don't finish all the tasks, please submit anyway. We're interested in seeing your approach, code quality, and problem-solving process—not a perfect finished product. Quality over quantity.

**SUBMISSION.md is Required**: Regardless of how much you complete, you must fill out the SUBMISSION.md file. This is where you'll explain what you completed, any assumptions you made, and what you'd improve with more time. This documentation is a crucial part of your submission and helps us understand your thought process.

**What We're Looking For**: We want to see how you think and solve problems, not whether you've memorized specific coding patterns or frameworks. We're assessing:
- Your approach to breaking down problems
- How you write clean, maintainable code
- Your testing philosophy and practices
- How you communicate technical decisions

**Managing Expectations**: While we want this to be a realistic time-boxed exercise, we do need to assess your technical skills and knowledge. Focus on demonstrating solid fundamentals rather than adding extra features. If you run out of time, use the SUBMISSION.md to tell us what you would have done differently or added with more time—this is valuable insight for us.

**Questions?**: If anything is unclear, make a reasonable assumption and document it in your submission. However, if you think something has gone wrong (setup issues, missing files, etc.), please contact the recruiter you've been speaking to.

---

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
Backend runs on: http://localhost:3001

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## 🧪 How to Test

### Backend
```bash
cd backend 
npm install
npm test
npm run start:dev
```

### Frontend
```bash
cd frontend 
npm install
npm test
npm start
```

---

## 🎯 Your Tasks

This application will organise your recipes! The initial template is set up as a React `frontend` with a NestJS `backend`, both using Typescript.

The `frontend` react application will display a list of recipes, allow adding new recipes, updating ratings, and deleting recipes. The `backend` should handle all data operations.

Implement the `recipe.service.ts`, as well as the `recipe.controller.ts`, and ensure some relevant testing is in place.
The initial type `recipe.entity.ts` & DTOs (https://docs.nestjs.com/techniques/validation) are here `src/recipes/dto/*.dto.ts`.
You may use whatever method you feel is appropriate to store the recipes - an in-memory array is fine, but if you wish to demonstrate using an ORM - e.g. Prisma, Sequelize, that would be very welcome. What we're looking for here is type-safety with data interactions. 

An initial JSON data seed is provided at `backend/data/recipes.json` (nb. you may want to modify this when adding any new fields). You aren't obliged to use this, but it may help you get started quickly.

The final implementation should include the following;
  - A working application, showing a list of recipes
  - User can add a new recipe
  - User can delete a recipe
  - User can rate a recipe (1-5 stars)
  - User can view the description of a recipe (you will need to modify the initial recipe model).
  - All relevant operations should be persisted in the `backend`
  - **BONUS** allow editing the recipe description/difficulty, and anything else you feel might be a good addition!

Both the `frontend` & `backend` applications should follow all software engineering best practices, including; 
  - Clean code structure
  - Unit tests for key components (don't worry about 100% coverage here, just show us your approach)
  - Type safety with Typescript
  - Any others you feel are relevant.

During your interview, we would like you to explain your design decisions, trade-offs, and any assumptions you made. The interview will include a screen-share, where you will walk us through your code, and show it running.

## 📋 API Endpoints

**Base URL:** `http://localhost:3001/api`

```
GET    /recipes              - List all recipes
POST   /recipes              - Create a new recipe
GET    /recipes/:id          - Get one recipe
PATCH  /recipes/:id          - Update recipe rating
DELETE /recipes/:id          - Delete a recipe
```

**Recipe Model starting point:**
```typescript
{
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number; // 1-5
  cookTimeMinutes: number;
  createdAt: Date;
}
```

---

## ✅ Submission

When complete, zip this whole repository, including the `frontend` and `backend` folders;

1. All completed code should be included
2. The completed `SUBMISSION.md` noting;
   - What you completed
   - Any assumptions made
   - What you'd improve with more time

Good luck! 🚀
