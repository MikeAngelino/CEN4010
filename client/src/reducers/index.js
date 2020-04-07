import { combineReducers } from "redux";
import wishlistReducer from "./wishListReducter";
const reducers = combineReducers({
  wishlist: wishlistReducer,
});

export default reducers;
