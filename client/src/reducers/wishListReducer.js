import { ADD_WISHLIST, GET_WISHLIST } from "../actions/types";

const initialState = {
  wishlists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST: {
      return {
        ...state,
        wishlists: action.payload,
      };
    }
    case ADD_WISHLIST:
      return {
        ...state,
        wishlists: [...state.wishlists, action.payload],
      };
      break;
    default:
      return state;
  }
};
export default reducer;
