import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import { IStockResultsTable } from '../ts/interfaces/IStockResultsTable'


const initialState: IStockResultsTable = {
    stockResults: []
}

const stockResultsSlice = createSlice({
    name: 'stockResults',
    initialState,
    reducers: {
        updateStockResults(state, action: PayloadAction<string[]>) {
            state.stockResults = action.payload
        },

    }
})

export const { updateStockResults } = stockResultsSlice.actions;
export default stockResultsSlice.reducer;