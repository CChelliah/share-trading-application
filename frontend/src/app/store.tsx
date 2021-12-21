import { configureStore } from '@reduxjs/toolkit'
import stockFiltersReducer from '../features/stockFilters/stockFilters-slice'

export const store = configureStore({
  reducer: {
    stockFilters: stockFiltersReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

