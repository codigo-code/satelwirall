import usersReducer from './states/users';
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
