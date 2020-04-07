import { combineReducers } from "redux";
import wishlistReducer from "./wishListReducer";
const reducers = combineReducers({
  wishLists: wishlistReducer,
});

export default reducers;
