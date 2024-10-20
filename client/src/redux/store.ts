import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminApi } from "./apis/adminApi";
import { appointApi } from "./apis/appointment";
import { userAPI } from "./apis/userApi";
import { adminReducer } from "./reducers/admin";
import {
  appointmentListReducer,
  appointmentReducer,
} from "./reducers/appointment";
import { tokenReducer } from "./reducers/token";
import { userReducer } from "./reducers/user";
const persistConfig = {
  key: "carePlus",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  //*--------------------- API------------------------
  [userAPI.reducerPath]: userAPI.reducer,
  [appointApi.reducerPath]: appointApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,

  //*----------------------REDUCERS----------------------

  [userReducer.reducerPath]: persistReducer(persistConfig, userReducer.reducer),
  [appointmentReducer.reducerPath]: persistReducer(
    persistConfig,
    appointmentReducer.reducer
  ),
  [adminReducer.reducerPath]: persistReducer(
    persistConfig,
    adminReducer.reducer
  ),
  [appointmentListReducer.reducerPath]: persistReducer(
    persistConfig,
    appointmentListReducer.reducer
  ),
  [tokenReducer.reducerPath]: persistReducer(
    persistConfig,
    tokenReducer.reducer
  ),
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (gdm) =>
    gdm({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userAPI.middleware)
      .concat(appointApi.middleware)
      .concat(adminApi.middleware),
});
export const persistor = persistStore(store);
