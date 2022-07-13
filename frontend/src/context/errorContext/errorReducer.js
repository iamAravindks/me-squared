import { CLEAR_ERROR, SET_ERROR } from "./errorTypes";

const errorContextReducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { error: action.payload };
    case CLEAR_ERROR:
      return { error: null };
    default:
      return state;
  }
};
export default errorContextReducer;
