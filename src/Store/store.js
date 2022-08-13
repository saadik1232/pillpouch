import { createStore } from "redux";
import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { LoginReducer } from "./LoginReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
//import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    logindata: LoginReducer,
  })
);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

// export const store = createStore(persistedReducer, applyMiddleware(thunk));

// export const store = createStore(
//   combineReducers({
//     logindata: LoginReducer,
//   }),
//   composeWithDevTools(applyMiddleware(thunk))
// );
