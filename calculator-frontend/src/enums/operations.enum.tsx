export enum Operation {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  SHOWVALUE = "SHOWVALUE",
}

export const mapOperationEnumToSign = (operation: Operation): string => {
  switch (operation) {
    case Operation.ADD:
      return "+";
    case Operation.SUBTRACT:
      return "-";
    case Operation.MULTIPLY:
      return "*";
    case Operation.DIVIDE:
      return "/";
    case Operation.SHOWVALUE:
      return "=";
  }
};
