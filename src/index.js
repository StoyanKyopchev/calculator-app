import React from 'react';
import ReactDOM from 'react-dom/client';
import { useReducer } from 'react';
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

export const ACTIONS = {
    ADD_DIGIT: "addDigit",
    CLEAR: "clear",
    CHOOSE_OPERATION: "chooseOperation",
    DELETE_DIGIT: "deleteDigit",
    EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if(payload.digit === "." && state.currentOperand == null){
                return state;
            }

            if((state.overwrite) && payload.digit === ".") {
                return {
                    ...state,
                    currentOperand: `${"0"}${payload.digit}`,
                    overwrite: false
                }
            }

            if(payload.digit === "." && state.currentOperand.includes(".")){
                return state;
            }

            if(payload.digit === "0" && state.currentOperand === "0") {
                return state;
            }

            if(state.currentOperand === "0" && payload.digit !== ".") {
                return {
                    ...state,
                    currentOperand: payload.digit
                }
            }

            if(state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }

        case ACTIONS.CLEAR:
            return {}

        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand == null && state.previousOperand == null) {
                return state;
            }

            if(state.previousOperand == null ) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }

            if(state.currentOperand == null || state.currentOperand == "") {
                return {
                    ...state,
                    operation: payload.operation
                }
            }

            return {
                ...state,
                previousOperand: calculate(state),
                operation: payload.operation,
                currentOperand: null
            }

        case ACTIONS.EVALUATE:
            if(
                state.previousOperand == null ||
                state.operation == null ||
                state.currentOperand == null
            ) {
                return state
            }

            return {
                ...state,
                previousOperand: null,
                currentOperand: calculate(state),
                operation: null,
                overwrite: true
            }
            
        case ACTIONS.DELETE_DIGIT:

            if(state.currentOperand == null) {
                return state;
            }

            if(state.currentOperand === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
    }
}

function calculate({ previousOperand, currentOperand, operation }) {
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    let result = "";

    if(isNaN(previous) || isNaN(current)) {
        return ""
    }

    switch(operation) {
        case "+":
            result = previous + current;
            break
        case "-":
            result = previous - current;
            break
        case "*":
            result = previous * current;
            break
        case "÷":
            result = previous / current;
            break
    }
    return result.toString();
}

function App() {

const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(reducer, {});

    return (
        <>
            <div className="calculatorWrapper">
                <div className="outputWrapper">
                    <div className="previousOperand">{previousOperand} {operation}</div>
                    <div className="currentOperand">{currentOperand}</div>
                </div>
                <button 
                    className="regularButton largeButton" 
                    onClick={() => dispatch({type: ACTIONS.CLEAR})}
                >
                    AC
                </button>
                <button 
                    className="regularButton"
                    onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}
                >
                    DEL
                </button>
                <OperationButton dispatch={dispatch} operation="÷" />
                <DigitButton digit="1" dispatch={dispatch} />
                <DigitButton digit="2" dispatch={dispatch} />
                <DigitButton digit="3" dispatch={dispatch} />
                <OperationButton dispatch={dispatch} operation="*" />
                <DigitButton digit="4" dispatch={dispatch} />
                <DigitButton digit="5" dispatch={dispatch} />
                <DigitButton digit="6" dispatch={dispatch} />
                <OperationButton dispatch={dispatch} operation="+" />
                <DigitButton digit="7" dispatch={dispatch} />
                <DigitButton digit="8" dispatch={dispatch} />
                <DigitButton digit="9" dispatch={dispatch} />
                <OperationButton dispatch={dispatch} operation="-" />
                <DigitButton digit="." dispatch={dispatch} />
                <DigitButton digit="0" dispatch={dispatch} />
                <button 
                    className="regularButton largeButton"
                    onClick={() => dispatch({type: ACTIONS.EVALUATE})}
                >
                    =
                </button>
            </div>
        </>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);