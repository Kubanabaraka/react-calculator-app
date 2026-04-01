import Display from "./Display";
import Button from "./Button";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumber = (value: string) => {
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperator = (op: string) => {
    setFirstNumber(Number(display));
    setOperator(op);
    setDisplay("");
  };
  const handleDelete = () => {
    setDisplay("0");
  };

  const calculate = () => {
    if (firstNumber === null || operator === null) return;
    const secondNumber = Number(display);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "x":
        result = firstNumber * secondNumber;
        break;

      case "÷":
        result = firstNumber / secondNumber;
    }
    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
  };
  return (
    <div className="w-95 overflow-hidden border border-[#8f93a0] bg-[#8f93a0] shadow-xl">
      <Display value={display} />

      <div className="grid grid-cols-4 gap-0.8 bg-[#8f93a0]">
        <Button label="AC" onClick={handleDelete} />
        <Button label="+/-" />
        <Button
          label="%"
          variant="operator"
          onClick={() => handleOperator("%")}
        />
        <Button
          label="÷"
          variant="operator"
          onClick={() => handleOperator("÷")}
        />

        <Button label="7" onClick={() => handleNumber("7")} />
        <Button label="8" onClick={() => handleNumber("8")} />
        <Button label="9" onClick={() => handleNumber("9")} />
        <Button
          label="x"
          variant="operator"
          onClick={() => handleOperator("x")}
        />

        <Button label="4" onClick={() => handleNumber("4")} />
        <Button label="5" onClick={() => handleNumber("5")} />
        <Button label="6" onClick={() => handleNumber("6")} />
        <Button
          label="-"
          variant="operator"
          onClick={() => handleOperator("-")}
        />

        <Button label="1" onClick={() => handleNumber("1")} />
        <Button label="2" onClick={() => handleNumber("2")} />
        <Button label="3" onClick={() => handleNumber("3")} />
        <Button
          label="+"
          variant="operator"
          onClick={() => handleOperator("+")}
        />

        <Button
          className="col-span-2"
          label="0"
          onClick={() => handleNumber("0")}
        />
        <Button label="." />
        <Button label="=" variant="operator" onClick={calculate} />
      </div>
    </div>
  );
}
