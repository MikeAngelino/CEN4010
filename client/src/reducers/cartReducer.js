import { ADD_TO_CART, GET_CART_ITEMS } from "../actions/types";

const initialState = {
  carts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        carts: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
