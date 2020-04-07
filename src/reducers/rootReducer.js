import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { errorMessageReducer } from "./errorMessageReducer";
import { imageReducer } from "./imageReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  error: errorMessageReducer,
  image: imageReducer
});
