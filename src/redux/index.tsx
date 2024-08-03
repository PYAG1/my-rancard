import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./AuthSlice";

// Define the combined reducers
const reducers = combineReducers({
  auth: authReducer,
});

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create and configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Export the store and persistor
export { store, persistor };
