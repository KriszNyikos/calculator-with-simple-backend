import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import "./CalcContainer.css";
import {
  buttons,
  convertInputValue,
  doOperation,
} from "./CalcContainer.service";
import { Operation, mapOperationEnumToSign } from "../../enums/operations.enum";

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

  const handleInputChange = (newNumberValue: string) => {
    setInputValue([...inputValue, newNumberValue]);
  };

  const handlerChangeOperation = (operation: Operation) => {
    if (inputValue.length === 0) {
      return;
    }

    if (selectedOperation === undefined) {
      setSelectedOperation(operation);
      setAccumulatorValue(convertInputValue(inputValue).toString());
    } else {
      doSelectedOperation(operation);
    }
  };

  const doSelectedOperation = (operation: Operation) => {
    if (selectedOperation) {
      setAccumulatorValue(
        doOperation(selectedOperation, accumulatorValue, inputValue)
      );
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
        {accumulatorValue} { selectedOperation && mapOperationEnumToSign(selectedOperation)}
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
        { 
          Object.keys(Operation).map(key => {
            return <div onClick={() => handlerChangeOperation(key as Operation)}> {mapOperationEnumToSign(key as Operation)} </div>
          })
        }
        
          <div onClick={resetCalculator}>AC</div>
        </div>
      </div>
    </div>
  );
}
