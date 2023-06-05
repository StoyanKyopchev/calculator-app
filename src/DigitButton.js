import { ACTIONS } from "./index";

export default function DigitButton({ dispatch, digit }) {
    return  <button 
                className="regularButton"
                onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})}
            >
                {digit}
            </button>
}