import { z } from 'zod';

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

export const TEST_DIFFICULTIES = [
  "easy",
  "medium",
  'hard',
] as const;

export const CategorySchema = z.enum(TEST_CATEGORIES);
export const DifficultySchema = z.enum(TEST_DIFFICULTIES);

export type Category = z.infer<typeof CategorySchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;

export const TEST_OWNERSHIP_OPTIONS = [
  "mine",
  "public",
  "all_tests",
] as const;

export const TEST_SORT_OPTIONS = [
  "newest",
  "oldest",
  "attempts"
] as const

export const OwnershipOptionsSchema = z.enum(TEST_OWNERSHIP_OPTIONS);
export const SortOptionsSchema = z.enum(TEST_SORT_OPTIONS);

export type OwnershipOption = z.infer<typeof OwnershipOptionsSchema>;
export type SortOption = z.infer<typeof SortOptionsSchema>;
