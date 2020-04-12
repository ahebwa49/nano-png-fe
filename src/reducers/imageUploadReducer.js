import { UPLOAD } from "../actions/actions";
import { REMOVE } from "../actions/actions";

const defaultState = [];
export const imageUploadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPLOAD:
      return [...state, action.image];
      // eslint-disable-next-line
      break;

    case REMOVE:
      return defaultState;
      // eslint-disable-next-line
      break;

    default:
      return state;
  }
};
