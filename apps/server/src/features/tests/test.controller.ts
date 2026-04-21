import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { requireAuth, requireAdmin, AuthRequest } from "../../middleware/authGuard.js";
import * as testService from "./test.service.js";
import * as attemptService from "../attempts/attempt.service.js";
import { CatalogFilterRequestSchema, CreateTestRequestSchema } from "@test-platform/shared/schemas";
import { validateObjectId } from "../../utils/validateObjectId.js";

export const testRouter: Router = Router();

testRouter.use(requireAuth)

testRouter.get("/", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  
  const catalogFilterParams = CatalogFilterRequestSchema.parse(req.query);
  const catalogTests = await testService.getCatalogTests(catalogFilterParams, userId);
  
  res.status(200).json(catalogTests);
}));

testRouter.post("/", catchAsync(async (req: AuthRequest, res) => {
  const body = CreateTestRequestSchema.parse(req.body);
  const userId = req.user!.userId;
  
  const test = await testService.createTest(body, userId);
  
  res.status(201).json(test);
}));

testRouter.delete("/:id", requireAdmin, catchAsync(async (req: AuthRequest, res) => {
  const testId = req.params.id;

  validateObjectId(testId, "test");
  
  const test = await testService.deleteTest(testId);
  
  if (!test) {
    res.status(404).json({ message: "Test not found" });
    return;
  }
  
  res.status(204).send();
}));

testRouter.get("/my-tests", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  
  const tests = await testService.getUserTests(userId);
  
  res.status(200).json(tests);
}));

testRouter.get("/:id/stats", catchAsync(async (req: AuthRequest, res) => {
  const testId = req.params.id;
  const userId = req.user!.userId;

  validateObjectId(testId, "test");
  await testService.validateTestOwnership(testId, userId);

  const stats = await testService.getTestStats(testId);
  
  res.status(200).json(stats);
}));

testRouter.get("/:id/attempts", catchAsync(async (req: AuthRequest, res) => {
  const testId = req.params.id;
  const userId = req.user!.userId;

  validateObjectId(testId, "test");
  await testService.validateTestOwnership(testId, userId);

  const attempts = await attemptService.getTestAttempts(testId);
  
  res.status(200).json(attempts);
}));
