import { ADD_WISHLIST } from "../actions/types";

const initialState = {
  wishlists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WISHLIST:
      return {
        ...state,
      };
      break;
    default:
      return state;
  }
};
export default reducer;
