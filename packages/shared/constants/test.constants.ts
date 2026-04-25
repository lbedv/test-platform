// Test configuration constants
// Defines available test categories, difficulty levels, and filtering options
import { z } from 'zod';

// Subject categories for tests
export const TEST_CATEGORIES = [
  "general_knowledge",
  "mathematics",
  "linguistics",
  "physics",
  "chemistry",
  "biology",
  "history",
  "geography",
  "economics",
  "programming",
  "data_science",
  "medicine",
  "law",
  "music",
  "art",
  "other",
] as const;

// Difficulty levels for test difficulty classification
export const TEST_DIFFICULTIES = [
  "easy",
  "medium",
  'hard',
] as const;

// Zod schemas for category and difficulty validation
export const CategorySchema = z.enum(TEST_CATEGORIES);
export const DifficultySchema = z.enum(TEST_DIFFICULTIES);

// TypeScript types
export type Category = z.infer<typeof CategorySchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;

// Test filtering options: mine (created by user), public (all tests), or all_tests
export const TEST_OWNERSHIP_OPTIONS = [
  "mine",
  "public",
  "all_tests",
] as const;

// Sorting options for test catalog
export const TEST_SORT_OPTIONS = [
  "newest",   // Most recently created
  "oldest",   // Least recently created
  "attempts"  // Most attempted
] as const

// Zod schemas for ownership and sort validation
export const OwnershipOptionsSchema = z.enum(TEST_OWNERSHIP_OPTIONS);
export const SortOptionsSchema = z.enum(TEST_SORT_OPTIONS);

// TypeScript types
export type OwnershipOption = z.infer<typeof OwnershipOptionsSchema>;
export type SortOption = z.infer<typeof SortOptionsSchema>;
