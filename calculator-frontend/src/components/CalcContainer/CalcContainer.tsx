import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import "./CalcContainer.css";
import {
  buttons,
  convertInputValue,
  doOperation,
} from "./calc-container.service";
import { Operation, mapOperationEnumToSign } from "../../enums/operations.enum";

import {
  getMemorizedData,
  putMemorizedData,
} from "../../services/memory.service";

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

  const handleInputChange = (newNumberValue: string) => {
    if (inputValue.includes(".") && newNumberValue === ".") {
      return;
    }

    if (newNumberValue === "0" && inputValue.length === 0) {
      return;
    }

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

  const handlerSaveNumber = () => {
    getMemorizedData()
      .then((data) => {
        setInputValue(data.storedNumber.split(""));
      })
      .catch(console.error);
  };
  const handlerGetNumber = (savedNumber: string[]) => {
    putMemorizedData(savedNumber.join(""))
      .then(() => {
        alert("Number saved");
      })
      .catch(console.error);
  };

  const doSelectedOperation = (clickedOperation: Operation) => {
    if (selectedOperation) {
      setAccumulatorValue(
        doOperation(selectedOperation, accumulatorValue, inputValue)
      );
    }

    if (clickedOperation === Operation.SHOWVALUE) {
      setSelectedOperation(undefined);
    } else {
      setSelectedOperation(clickedOperation);
    }
  };

  const resetCalculator = () => {
    setInputValue([]);
    setAccumulatorValue("");
    setSelectedOperation(undefined);
  };

  const removeLastNumber = () => {
    if (inputValue.length === 0) {
      return;
    }

    setInputValue(inputValue.slice(0, -1));
  }

  return (
    <div className="calc-container shadow d-flex flex-column justify-content-center">
      <div className="number-field d-flex justify-content-end rounded-top p-1 align-items-center fs-2 border border-bottom-0 border-white">
        {inputValue.join("")}
      </div>
      <div className="info-field d-flex  border-end border-start border-white p-1 align-items-center justify-content-end fs-2">
        {selectedOperation && mapOperationEnumToSign(selectedOperation)}
        {' '}
        {accumulatorValue}
      </div>

      <div className="border border-top-0 border-white d-flex justify-content-center">
        <div className="button-grid flex-grow-1 ">
          {buttons.map<ReactNode>((buttonNumber: string, key): ReactNode => {
            return (
              <div
                key={key}
                onClick={() => handleInputChange(buttonNumber)}
                className="cursor-pointer border border-primary text-center d-flex align-items-center justify-content-center fs-3"
              >
                {buttonNumber}
              </div>
            );
          })}
        </div>

        <div className="operator-button-column d-flex flex-column justify-content-between fs-3">
          {Object.keys(Operation).map((key, index) => {
            return (
              <div
                key={index}
                onClick={() => handlerChangeOperation(key as Operation)}
                className="text-center border border-warning cursor-pointer"
              >
                {mapOperationEnumToSign(key as Operation)}
              </div>
            );
          })}

          <div
            onClick={() => handlerGetNumber(inputValue) }
            className="text-center border border-warning cursor-pointer"
          >
            {" "}
            M+{" "}
          </div>
          <div
            onClick={() => handlerSaveNumber()}
            className="text-center border border-warning cursor-pointer"
          >
            {" "}
            M-{" "}
          </div>

          <div
            onClick={resetCalculator}
            className="text-center border border-warning cursor-pointer"
          >
            AC
          </div>

          <div
            onClick={removeLastNumber}
            className="text-center border border-warning cursor-pointer"
          >
            C
          </div>
        </div>
      </div>
    </div>
  );
}
