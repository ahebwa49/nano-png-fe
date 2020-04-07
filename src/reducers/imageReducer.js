import { ADD } from "../actions/actions";
import { COMPRESS } from "../actions/actions";

let newState;

const defaultState = {
  isCompressing: false,
  finished: false,
  link: "",
  originalFileSizeInBytes: null,
  newFileSizeInBytes: null
};
export const imageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      newState = Object.assign({}, defaultState, action.data);
      return newState;
      // eslint-disable-next-line
      break;

    case COMPRESS:
      newState = Object.assign({}, defaultState, {
        ...defaultState,
        isCompressing: true
      });
      return newState;
      // eslint-disable-next-line
      break;

    default:
      return state;
  }
};
