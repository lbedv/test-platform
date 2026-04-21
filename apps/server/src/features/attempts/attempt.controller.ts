import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { requireAuth, AuthRequest } from "../../middleware/authGuard.js";
import * as attemptService from "./attempt.service.js";
import { UpdateAnswerRequest } from "@test-platform/shared/schemas";
import { validateObjectId } from "../../utils/validateObjectId.js";

export const attemptsRouter: Router = Router();

attemptsRouter.use(requireAuth);

// Get active attempt
attemptsRouter.get("/active", catchAsync(async (req: AuthRequest, res) => {
    const userId = req.user!.userId;

    const attempt = await attemptService.getActiveAttempt(userId);

    res.status(200).json(attempt);
  })
);

// Create new attempt
attemptsRouter.post("/:id", catchAsync(async (req: AuthRequest, res) => {
    const testId = req.params.id;
    const userId = req.user!.userId;

    validateObjectId(testId, "test");

    const result = await attemptService.createAttempt(testId, userId);

    res.status(201).json(result);
  })
);

// Submit attempt
attemptsRouter.post("/:id/submit", catchAsync(async (req: AuthRequest, res) => {
    const attemptId = req.params.id;
    const userId = req.user!.userId;

    validateObjectId(attemptId, "attempt");
    await attemptService.validateAttemptOwnership(attemptId, userId);

    const result = await attemptService.submitAttempt(attemptId);

    res.status(200).json(result);
  })
);

// Update question answer
attemptsRouter.patch("/:id/answer", catchAsync(async (req: AuthRequest, res) => {
  const attemptId = req.params.id;
  const userId = req.user!.userId;
  const questionInput = UpdateAnswerRequest.parse(req.body);

  validateObjectId(attemptId, "attempt");
  await attemptService.validateAttemptOwnership(attemptId, userId);

  const result = await attemptService.updateQuestionAnswer(
    attemptId,
    questionInput
  );

  res.status(200).json(result);
}));

// Get attempt results
attemptsRouter.get("/:id/results", catchAsync(async (req: AuthRequest, res) => {
    const attemptId = req.params.id;
    const userId = req.user!.userId;

    validateObjectId(attemptId, "attempt");
    await attemptService.validateAttemptOwnership(attemptId, userId);

    const attemptResult = await attemptService.getAttemptResults(attemptId);

    res.json(attemptResult);
  })
);

// Get all completed attempts
attemptsRouter.get("/", catchAsync(async (req: AuthRequest, res) => {
    const userId = req.user!.userId;

    const attemptSummaries = await attemptService.getCompletedAttempts(userId);

    res.json(attemptSummaries);
  })
);


