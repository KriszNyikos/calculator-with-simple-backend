import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import "./CalcContainer.css";

enum Operation {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  SHOWVALUE = "SHOWVALUE",
}

export default function CalcContainer() {
  const [inputValue, setInputValue] = useState<string[]>([]);
  const [accumulatorValue, setAccumulatorValue] = useState<string>("");
  const [selectedOperation, setSelectedOperation] = useState<
    Operation | undefined
  >();

  useEffect(() => {
    if (
      selectedOperation !== Operation.SHOWVALUE &&
      selectedOperation !== undefined
    ) {
      setInputValue([]);
    } else {
      setInputValue(accumulatorValue.split(""));
      setSelectedOperation(undefined);
    }
  }, [selectedOperation, accumulatorValue]);

  useEffect(() => {
    const isMultipleDecimal = inputValue.reduce((acc, curr) => {
      if (curr === ".") {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (isMultipleDecimal > 1) {
      setInputValue(inputValue.slice(0, -1));
    }
  }, [inputValue]);

  const buttons: string[] = [
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

  const convertInputValue = (): number => {
    return parseFloat(inputValue.join(""));
  };

  const handleInputChange = (newNumberValue: string) => {
    setInputValue([...inputValue, newNumberValue]);
  };

  const handlerChangeOperation = (operation: Operation) => {
    if (inputValue.length === 0) {
      return;
    }

    if (selectedOperation === undefined) {
      setSelectedOperation(operation);
      setAccumulatorValue(convertInputValue().toString());
    } else {
      doSelectedOperation(operation);
    }
  };

  const doSelectedOperation = (operation: Operation) => {
    switch (selectedOperation) {
      case Operation.ADD:
        setAccumulatorValue(
          (parseFloat(accumulatorValue) + convertInputValue()).toString()
        );
        break;
      case Operation.SUBTRACT:
        setAccumulatorValue(
          (parseFloat(accumulatorValue) - convertInputValue()).toString()
        );
        break;
      case Operation.MULTIPLY:
        setAccumulatorValue(
          (parseFloat(accumulatorValue) * convertInputValue()).toString()
        );
        break;
      case Operation.DIVIDE:
        setAccumulatorValue(
          (parseFloat(accumulatorValue) / convertInputValue()).toString()
        );
        break;
    }

    if (operation === Operation.SHOWVALUE) {
      setSelectedOperation(undefined);
    } else {
      setSelectedOperation(operation);
    }
  };

  const resetCalculator = () => {
    setInputValue([]);
    setAccumulatorValue("");
    setSelectedOperation(undefined);
  };

  return (
    <div className="calc-container d-flex flex-column justify-content-center">
      <div className="number-field d-flex justify-content-end rounded-top">
       {inputValue.join("")}
      </div>
      <div className="info-field d-flex  border-end border-start border-white justify-content-end">
        {accumulatorValue} {selectedOperation}
      </div>

      <div className="border border-top-0 border-white d-flex justify-content-center">
        <div className="button-grid flex-grow-1">
          {buttons.map<ReactNode>((buttonNumber: string, key): ReactNode => {
            return (
              <div key={key} onClick={() => handleInputChange(buttonNumber)}>
                {buttonNumber}
              </div>
            );
          })}
        </div>

        <div className="d-flex flex-column justify-content-between ">
          <div onClick={() => handlerChangeOperation(Operation.ADD)}> + </div>
          <div onClick={() => handlerChangeOperation(Operation.SUBTRACT)}>
            {" "}
            -{" "}
          </div>
          <div onClick={() => handlerChangeOperation(Operation.MULTIPLY)}>
            {" "}
            *{" "}
          </div>
          <div onClick={() => handlerChangeOperation(Operation.DIVIDE)}>
            {" "}
            /{" "}
          </div>
          <div onClick={() => handlerChangeOperation(Operation.SHOWVALUE)}>
            {" "}
            ={" "}
          </div>
          <div onClick={resetCalculator}>AC</div>
        </div>
      </div>
    </div>
  );
}
