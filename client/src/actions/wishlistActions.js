import { ADD_WISHLIST, GET_WISHLIST } from "./types";
import axios from "axios";

export const addToWishList = (data) => (dispatch) => {
  axios
    .post("http://localhost:3002/api/wishlists", {
      data,
      userId: "1",
    })
    .then((res) => {
      if (res.data.success === 1)
        dispatch({ type: ADD_WISHLIST, payload: data });
      else console.log("Errrorr !!!");
    });
};

export const getWishLists = () => (dispatch) => {
  const userId = "1";
  axios.get(`http://localhost:3002/api/wishlists/${userId}`).then((res) => {
    if (res.data) dispatch({ type: GET_WISHLIST, payload: res.data.products });
  });
};
