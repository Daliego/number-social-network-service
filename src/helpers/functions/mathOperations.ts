import { AppError } from "@/utils/appError";

export function makeOperation(
  operation: string,
  number1: number,
  number2: number
) {
  switch (operation) {
    case "addition":
      return number1 + number2;
    case "subtraction":
      return number1 - number2;
    case "multiplication":
      return number1 * number2;
    case "division":
      if (number2 === 0) {
        throw new AppError("Division by zero is not allowed", 400);
      }
      return number1 / number2;
    default:
      throw new AppError("Invalid operation", 400);
  }
}
