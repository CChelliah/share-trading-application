import React, { FC }from 'react'
import StockFilterTable from 'components/molecules/StockFilterTable'
import StockResultsTable from 'components/molecules/StockResultsTable'
import Navbar from 'components/atoms/Navbar'
import { IStockFiltersHome } from 'ts/interfaces/IStockFiltersHome'
import { DEFAULT_TITLES } from 'utils/constants'



const StockFiltersHome:FC<IStockFiltersHome> = () => {
    return(
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col">
                <div className="flex flex-1 max-h-16 items-start">
                    <Navbar />
                </div>
                <div className="flex flex-row w-full items-start">
                    <StockFilterTable titles={DEFAULT_TITLES}/>
                    <StockResultsTable/>
                </div>
            </div>
        </div>
    )
}

export default StockFiltersHome
