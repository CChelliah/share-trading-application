import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IStockFilter {
    id?: number;
    indicator?: string | null;
    operator?: string | null;
    value?: number | null;
}

interface StockFiltersState {
    stockFilters: IStockFilter[];
}

const initialState: StockFiltersState = {
    stockFilters: [{
        'indicator': "null",
        'operator': "",
        'value': 0
    }]
}



const stockFiltersSlice = createSlice({
    name: 'stockFilters',
    initialState,
    reducers: {
        addFilter(state) {
            const emptyStockFilter = {
                'indicator': "null",
                'operator': "",
                'value': 0
            }
            state.stockFilters = [...state.stockFilters, emptyStockFilter]
        },
        updateFilter(state, action: PayloadAction<IStockFilter>) {
            const { id } = action.payload;
            console.log(id)
            delete action.payload.id;
            if (typeof(id) != "undefined"){
                state.stockFilters[id] = action.payload; 
            }    
        },
        deleteFilter(state, action: PayloadAction<number>){
            delete state.stockFilters[action.payload]
        },
        
    }
})

export const { addFilter , updateFilter, deleteFilter} = stockFiltersSlice.actions;
export default stockFiltersSlice.reducer;