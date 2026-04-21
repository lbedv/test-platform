import type { Category, Difficulty, OwnershipOption, SortOption } from "@test-platform/shared/constants";

/**
 * Test information displayed in the catalog.
 * Shows test metadata and user's personal attempt history.
 */
export interface CatalogTest {
  id: string
  title: string
  description: string
  category: Category
  difficulty: Difficulty
  questionsCount: number
  attemptsCount: number               // How many users have attempted this test
  timeLimitSeconds: number
  author: {
    firstName: string
    lastName: string
  }
  ownership: OwnershipOption       // Whether user created or public test
  createdAt: string             // ISO date string for when test was created
}

/**
 * Filter and sorting parameters for the test catalog.
 */
export interface CatalogFilterParams {
  search?: string;
  category?: Category;
  difficulty?: Difficulty;
  ownership?: OwnershipOption;
  sortBy?: SortOption; 
}