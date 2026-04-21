import type { QuestionResult } from "@test-platform/shared/schemas";
import type { AnswerType, AnswerOption } from "@test-platform/shared/schemas";
import type { QuestionType } from '@test-platform/shared/constants';

/**
 * countAnswerOutcomes - Utility function to count the number of correct, incorrect, and skipped answers in a list of question results.
 * @param questions - An array of QuestionResult objects representing the results of each question.
 * @returns An object containing the counts of correct, incorrect, and skipped answers.
 */
export function countAnswerOutcomes(questions: QuestionResult[]) {
  return {
    correct: questions.filter((q) => q.answerOutcome === "correct").length,
    incorrect: questions.filter((q) => q.answerOutcome === "incorrect").length,
    skipped: questions.filter((q) => q.answerOutcome === "skipped").length,
  }
}

/**
 * formatAnswers - Utility function to format the user's answer and the correct answer for display in the results breakdown.
 * Handles different question types (numeric, true/false, multiple choice, text input) and accounts for skipped questions.
 */
export function formatAnswers(
  correctAnswer: AnswerType,
  questionType: QuestionType,
  isSkipped: boolean,
  userAnswer?: AnswerType,
  options?: AnswerOption[])
{
  const noAnswerText = "No answer provided";

  switch (questionType) {
    case "numeric":
      return {
        userText: isSkipped ? noAnswerText : String(userAnswer),
        correctText: String(correctAnswer),
      };
    case "trueFalse":
      return {
        userText: isSkipped ? noAnswerText : (userAnswer ? "True" : "False"),
        correctText: correctAnswer ? "True" : "False",
      };
    case "multipleChoice": {
      const getLabelsForIds = (ids: string[]) => {
        return ids.map(id => {
          const option = options!.find(opt => opt.id === id);
          return option ? option.label : id; 
        });
      };
      return {
        userText: isSkipped ? noAnswerText : getLabelsForIds(userAnswer! as string[]),
        correctText: getLabelsForIds(correctAnswer as string[]),
      };
    }
    case "textInput":
      return {
        userText: isSkipped ? noAnswerText : String(userAnswer),
        correctText: String(correctAnswer),
      };
  }
}