import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Transform to exclude the socket state
const removeSocketTransform = createTransform(
  // transform state coming from redux on its way to being serialized and persisted.
  (inboundState, key) => {
    if (key === 'socket') return undefined; // Do not persist the socket state
    return inboundState;
  },
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState, key) => {
    return outboundState;
  }
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [removeSocketTransform], // Apply the transform
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
