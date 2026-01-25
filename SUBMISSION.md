# Submission - Full Stack Engineer Test

**Candidate Name:** _______________Divine Ogbe  
**Date:** _______________  25/01/2026

---

## 📝 Notes & Assumptions

# **How I approached solving the problem?**

I approached this challenge by simulating a real-world product engineering cycle. My goal was not just to fix(ish) the code, but to elevate the codebase maturity by introducing robust architectural patterns while keeping the developer experience usage friendly. I focused on three pillars: **Resiliency**, **Scalability**, and **Inclusivity**.

## **Code Architecture & Approach**

### **Centralized Configuration**
I noticed magic strings and scattered configuration values were creating brittle coupling. I refactored these into a **centralized configuration layer**. By decoupling environment variables and API constants from the business logic, I improved the app's maintainability and reduced the risk of regression during environment promotions.

### **Frontend Architecture**
- **Declarative State Management**: I adopted `SWR` to handle server state. Instead of manually managing loading/error flags (imperative), `SWR` allows us to declare what data a component needs. It handles caching, revalidation, and race conditions under the hood, ensuring the UI is always eventually consistent without boilerplate.
- **Composable Design System**: I shifted from pixel-pushing to a token-based design system. By defining CSS variables for semantic scales (like spacing and color palettes) in `index.css`, I created a "Single Source of Truth" for the UI. This enables scalable theming and ensures pixel-perfect consistency across components.

### **Backend Refactor**
- **CQRS-Lite & Modularity**: I respected the existing **Modular Architecture** (NestJS) by maintaining the separation of Read/Write concerns (`RecipesReadService` vs `RecipesWriteService`). This adherence to the **Single Responsibility Principle** ensures that as the app grows, read-heavy operations can be optimized independently of write logic.
- **Simplification Strategy**: I removed the pagination abstraction that I first implemented because it was premature. . I favored YAGNI (You Aren't Gonna Need It) over premature optimization, while leaving the architectural boundaries intact for future re-implementation.

## **Testing Strategy**

Tests shouldn not just verify implementation details; they should verify *behavior*. 
- **Behavioral Testing**: I migrated tests to use `userEvent` over `fireEvent`. While `fireEvent` triggers low-level DOM events, `userEvent` orchestrates the complex browser interactions (hover cycles, focus management) that occur when a real human interacts with the page. This moves our tests closer to **integration tests**, giving us higher confidence in the end-user experience.
- **Shift-Left Accessibility**: Accessibility is often treated as a QA step. I moved it to the development phase by integrating `jest-axe`. By adding `toHaveNoViolations()` assertions to our unit tests, we now catch structural WCAG violations (like insufficient contrast or missing landmarks) at build time, preventing technical debt from accumulating.

## **SEO, Accessibility & Internationalization**

### **Inclusivity by Default (A11y)**
- **Semantic DOM**: I refactored the document outline to use semantic HTML5 elements (`<main>`, `<article>`, `<button>`). This provides a meaningful accessibility tree for assistive technologies without needing excessive ARIA patches.
- **Programmatic Focus Management**: For the `RecipeCard`, I implemented a pattern where interactive areas (like the expand action) are fully keyboard-navigable via specific key-bindings (Enter/Space), ensuring compliance with **WCAG 2.1 AA** navigation standards.
- **Communicating State**: I used **Live Regions** (`role="alert"`) for forms. This ensures that dynamic state changes (like error messages) are immediately announced to screen reader users, treating them as first-class citizens of the UI.

### **Internationalization (i18n) Foundation**
- **Content Abstraction**: I extracted hardcoded UI strings into structured JSON files. This separation of content from presentation is not just for cleaning code, it is the foundational step for i18n, allowing translation workflows to run parallel to development without touching the codebase.

## **Tools & Libraries**

- **SWR**: For **declarative data fetching** and automatic cache invalidation strategies.
- **CSS Modules**: To enforce **local scope** for styles, preventing the cascade from causing regression side-effects.
- **Jest & Jest-Axe**: To enable **Test-Driven Development (TDD)** with integrated accessibility compliance checks.
- **Classnames**: For **conditional class composition**, keeping rendering logic readable and declarative.

---

## 🚀 What I'd Improve With More Time

- **Network Layer Mocking**: I really wanted to implement `Mock Service Worker (MSW)` to intercept requests at the network level. This would have given us even more realistic tests without hitting the real backend, but I decided to skip it for this iteration to avoid the initial setup overhead and focus on feature delivery.
- **End-to-End Confidence**: While our unit and integration tests are strong, nothing beats `Cypress` for simulating full user journeys (like creating a recipe and seeing it appear in the dashboard). Adding E2E tests would be my next step to guarantee the critical paths work flawlessly.
- **Robust Form Management**: The current form works, but for complex validation logic, I would bring in `React Hook Form` paired with `Yup`. This combination drastically reduces render cycles and provides a type-safe schema validation layer that scales much better than manual state management.
- **Full Data Persistence**: Currently, I am writing to a file. In a real-world scenario, I would spin up a `PostgreSQL` database managed by `Prisma`. This would give us relational data integrity, proper indexing, and type-safe database queries.
- **Editable Fields (Bonus)**: I would implement the bonus feature to make every field in the `RecipeForm` editable in place or via a dedicated edit view.
- **Large Dataset Handling**: To ensure the frontend scales with the data, I would implement **virtualization** (lazy loading) or paginated views for the recipe list. This ensures the application remains performant even as the user's collection grows to thousands of recipes.

**Additional Improvements:**
- **CI/CD Pipeline**: I would set up a GitHub Actions workflow to run our `jest` suite, `jest-axe` audits, and `eslint` checks on every pull request. This ensures that no bad code ever merges to main.
- **Component Documentation**: I would introduce `Storybook` to document our UI components in isolation. This allows designers and developers to work on the visual system independently of the app logic and serves as living documentation for the team.

---

## 💡 Additional Comments
I spent approximately **4 hours** on this exercise.

(Any other comments or context you'd like to share)
