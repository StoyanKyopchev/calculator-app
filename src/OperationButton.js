import { ACTIONS } from "./index"

export default function OperationButton({ dispatch, operation }) {
    return  <button 
                className="regularButton"
                onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}
            >
                {operation}
            </button>
}