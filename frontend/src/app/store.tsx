import { configureStore } from '@reduxjs/toolkit'
import stockFiltersReducer from 'features/stockFilters-slice'
import stockResultsReducer from 'features/stockResults-slice'
import { stocksApiSlice } from 'features/api/stocks-api-slice'

export const store = configureStore({
  reducer: {
    stockFilters: stockFiltersReducer,
    stockResults: stockResultsReducer,
    [stocksApiSlice.reducerPath] : stocksApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(stocksApiSlice.middleware)
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

