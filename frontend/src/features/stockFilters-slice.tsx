import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterData } from '../ts/interfaces/IFilterData'
import { IStockFilter, IStockFiltersState } from '../ts/interfaces/IStockFilter'
import { EMPTY_STOCK_FILTER } from '../utils/constants'
import { FilterNames } from '../ts/types/FilterNames'

const initialState: IStockFiltersState = {
    stockFilters: [EMPTY_STOCK_FILTER]
}

const stockFiltersSlice = createSlice({
    name: 'stockFilters',
    initialState,
    reducers: {
        addFilter(state) {
            state.stockFilters = [...state.stockFilters, EMPTY_STOCK_FILTER]
        },
        updateFilter(state, action: PayloadAction<IFilterData>) {
            const {id, field, value} = action.payload;
            const key:FilterNames = field as FilterNames
            state.stockFilters[id][key] = value
        },
        deleteFilter(state, action: PayloadAction<number>){
            delete state.stockFilters[action.payload]
        },
        
    }
})

export const { addFilter , updateFilter, deleteFilter} = stockFiltersSlice.actions;
export default stockFiltersSlice.reducer;