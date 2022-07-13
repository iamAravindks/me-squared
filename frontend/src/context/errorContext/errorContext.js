import { createContext, useReducer } from "react";
import errorContextReducer from "./errorReducer";
import { CLEAR_ERROR, SET_ERROR } from "./errorTypes";

const initialState = { error: null };
export const ErrorContext = createContext(initialState);

export const ErrorProvider = ({ children }) => {
  const [errorState, dispatch] = useReducer(errorContextReducer, initialState);

  const setError = (error) =>
  {
    console.log(error)
    dispatch({ type: SET_ERROR, payload: error });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 2000);
  };

  return (
    <ErrorContext.Provider
      value={{
        error: errorState.error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
