import React from 'react'
//import StockFilter from '../../molecules/StockFilter'
//import ButtonGroup from '../../molecules/ButtonGroup'
import List from '../../organisms/List'
import Table from '../../atoms/Table'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {addFilter } from '../../../features/stockFilters/stockFilters-slice'

export interface Home {

}

const titles = ['Indicator', 'Operator', 'Value', 'Actions']

const stockFilters = 
[{
    "indicator": "MACD",
    "operator": "gt",
    "value": 3
},
{
    "indicator": "Stoch_Fastk",
    "operator": "gt",
    "value": 30
},
{
    "indicator": "Stoch_Fastk",
    "operator": "gt",
    "value": 30
},
{
    "indicator": "Stoch_Fastk",
    "operator": "gt",
    "value": 30
},
{
    "indicator": "Stoch_Fastk",
    "operator": "gt",
    "value": 30
}]

const Home = (props: Home) => {
    return(
        <div className="flex-auto">
            <div className="flex flex-row w-full items-start">
                <Table />
                <Table titles={titles}/>
            </div>
        </div>
    )
}

export default Home
