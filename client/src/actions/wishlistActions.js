import { ADD_WISHLIST } from "./types";

export const addToWishList = (book) => (dispatch) => {
  dispatch({ type: ADD_WISHLIST, payload: book });
};
