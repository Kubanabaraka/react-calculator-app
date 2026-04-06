import Display from "./Display";
import Button from "./Button";
import { useReducer } from "react";

type Operator = "+" | "-" | "x" | "÷" | "%";

type CalculatorState = {
  display: string;
  firstOperand: number | null;
  operator: Operator | null;
  waitingForSecondOperand: boolean;
  isResultDisplayed: boolean;
};

type CalculatorAction =
  | { type: "INPUT_DIGIT"; payload: string }
  | { type: "INPUT_DECIMAL" }
  | { type: "TOGGLE_SIGN" }
  | { type: "SET_OPERATOR"; payload: Operator }
  | { type: "CALCULATE" }
  | { type: "CLEAR" };

const initialState: CalculatorState = {
  display: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isResultDisplayed: false,
};

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  return String(value);
}

function performOperation(
  first: number,
  second: number,
  operator: Operator,
): number {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "x":
      return first * second;
    case "÷":
      return second === 0 ? NaN : first / second;
    case "%":
      return first % second;
    default:
      return second;
  }
}

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "INPUT_DIGIT": {
      if (state.display === "Error") {
        return { ...initialState, display: action.payload };
      }

      if (state.waitingForSecondOperand) {
        return {
          ...state,
          display: action.payload,
          waitingForSecondOperand: false,
          isResultDisplayed: false,
        };
      }

      if (state.isResultDisplayed && state.operator === null) {
        return {
          ...initialState,
          display: action.payload,
        };
      }

      return {
        ...state,
        display:
          state.display === "0"
            ? action.payload
            : state.display + action.payload,
        isResultDisplayed: false,
      };
    }

    case "INPUT_DECIMAL": {
      if (state.display === "Error") {
        return { ...initialState, display: "0." };
      }

      if (state.waitingForSecondOperand) {
        return {
          ...state,
          display: "0.",
          waitingForSecondOperand: false,
          isResultDisplayed: false,
        };
      }

      if (state.isResultDisplayed && state.operator === null) {
        return {
          ...initialState,
          display: "0.",
        };
      }

      if (state.display.includes(".")) {
        return state;
      }

      return {
        ...state,
        display: state.display + ".",
        isResultDisplayed: false,
      };
    }

    case "TOGGLE_SIGN": {
      if (state.display === "0" || state.display === "Error") {
        return state;
      }

      const toggledDisplay = state.display.startsWith("-")
        ? state.display.slice(1)
        : `-${state.display}`;

      if (state.operator === null) {
        return {
          ...state,
          display: toggledDisplay,
          firstOperand: Number(toggledDisplay),
        };
      }

      return {
        ...state,
        display: toggledDisplay,
      };
    }

    case "SET_OPERATOR": {
      if (state.display === "Error") {
        return state;
      }

      const inputValue = Number(state.display);

      if (state.firstOperand === null) {
        return {
          ...state,
          firstOperand: inputValue,
          operator: action.payload,
          waitingForSecondOperand: true,
          isResultDisplayed: false,
        };
      }

      if (state.waitingForSecondOperand) {
        return {
          ...state,
          operator: action.payload,
        };
      }

      if (state.operator !== null) {
        const result = performOperation(
          state.firstOperand,
          inputValue,
          state.operator,
        );
        const formattedResult = formatResult(result);

        if (formattedResult === "Error") {
          return initialState;
        }

        return {
          ...state,
          display: formattedResult,
          firstOperand: result,
          operator: action.payload,
          waitingForSecondOperand: true,
          isResultDisplayed: false,
        };
      }

      return {
        ...state,
        firstOperand: inputValue,
        operator: action.payload,
        waitingForSecondOperand: true,
        isResultDisplayed: false,
      };
    }

    case "CALCULATE": {
      if (
        state.operator === null ||
        state.firstOperand === null ||
        state.waitingForSecondOperand
      ) {
        return state;
      }

      const secondOperand = Number(state.display);
      const result = performOperation(
        state.firstOperand,
        secondOperand,
        state.operator,
      );
      const formattedResult = formatResult(result);

      if (formattedResult === "Error") {
        return initialState;
      }

      return {
        ...state,
        display: formattedResult,
        firstOperand: result,
        operator: null,
        waitingForSecondOperand: false,
        isResultDisplayed: true,
      };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <div className="w-95 overflow-hidden border border-[#8f93a0] bg-[#8f93a0] shadow-xl">
      <Display value={state.display} />

      <div className="grid grid-cols-4 gap-0.8 bg-[#8f93a0]">
        <Button label="AC" onClick={() => dispatch({ type: "CLEAR" })} />
        <Button label="+/-" onClick={() => dispatch({ type: "TOGGLE_SIGN" })} />
        <Button
          label="%"
          variant="operator"
          onClick={() => dispatch({ type: "SET_OPERATOR", payload: "%" })}
        />
        <Button
          label="÷"
          variant="operator"
          onClick={() => dispatch({ type: "SET_OPERATOR", payload: "÷" })}
        />

        <Button
          label="7"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "7" })}
        />
        <Button
          label="8"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "8" })}
        />
        <Button
          label="9"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "9" })}
        />
        <Button
          label="x"
          variant="operator"
          onClick={() => dispatch({ type: "SET_OPERATOR", payload: "x" })}
        />

        <Button
          label="4"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "4" })}
        />
        <Button
          label="5"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "5" })}
        />
        <Button
          label="6"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "6" })}
        />
        <Button
          label="-"
          variant="operator"
          onClick={() => dispatch({ type: "SET_OPERATOR", payload: "-" })}
        />

        <Button
          label="1"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "1" })}
        />
        <Button
          label="2"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "2" })}
        />
        <Button
          label="3"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "3" })}
        />
        <Button
          label="+"
          variant="operator"
          onClick={() => dispatch({ type: "SET_OPERATOR", payload: "+" })}
        />

        <Button
          className="col-span-2"
          label="0"
          onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "0" })}
        />
        <Button label="." onClick={() => dispatch({ type: "INPUT_DECIMAL" })} />
        <Button
          label="="
          variant="operator"
          onClick={() => dispatch({ type: "CALCULATE" })}
        />
      </div>
    </div>
  );
}
