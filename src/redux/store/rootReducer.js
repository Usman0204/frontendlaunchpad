import { combineReducers } from "redux";
import { PoolActiveReducer } from "../Reducers/Index";

const rootReducer = combineReducers({
  PoolActiveReducer:PoolActiveReducer,
});

export default rootReducer;