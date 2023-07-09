import { Operation } from "../../enums/operations.enum";

export const buttons: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
];

export const convertInputValue = (inputValue: string[]): number => {
  return parseFloat(inputValue.join(""));
};

export const doOperation = (
  selectedOperation: Operation,
  accumulatorValue: string,
  inputValue: string[]
): string => {
  switch (selectedOperation) {
    case Operation.ADD:
      return (
        parseFloat(accumulatorValue) + convertInputValue(inputValue)
      ).toString();

    case Operation.SUBTRACT:
      return (
        parseFloat(accumulatorValue) - convertInputValue(inputValue)
      ).toString();

    case Operation.MULTIPLY:
      return (
        parseFloat(accumulatorValue) * convertInputValue(inputValue)
      ).toString();

    case Operation.DIVIDE:
      return (
        parseFloat(accumulatorValue) / convertInputValue(inputValue)
      ).toString();

    case Operation.SHOWVALUE:
        return parseFloat(accumulatorValue).toString();
  }
};
