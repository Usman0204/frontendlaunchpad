import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";


// compose are enhancers used for composing middlewares for redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

const configureStore = () => {
  return createStore(rootReducer,initialState ,composeEnhancers(applyMiddleware(thunk)));
};

const store = configureStore();

export default store;

// const initialState = {};
// const middleware = [thunk];

//  const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleware))
// );

// export default store;