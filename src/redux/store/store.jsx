import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// rest of your code
export const store = configureStore({
  middleware: [thunk],
  reducer: reducers,
});
