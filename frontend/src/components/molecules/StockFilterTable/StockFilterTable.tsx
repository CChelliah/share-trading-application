import React, { FC, useEffect, useState } from 'react'
import Select from '../../atoms/Select'
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addFilter, updateFilter, deleteFilter } from '../../../features/stockFilters-slice'
import { updateStockResults } from '../../../features/stockResults-slice'
import { IStockFilterTable } from '../../../ts/interfaces/IStockFilterTable'
import { IFilterData } from '../../../ts/interfaces/IFilterData'
import { IStockFilter } from '../../../ts/interfaces/IStockFilter'
import { useGetCustomQuery } from '../../../features/api/stocks-api-slice'
import { EMPTY_STOCK_FILTER} from '../../../utils/constants'


const StockFilterTable:FC<IStockFilterTable> = ({
    titles,
}) => {
    const stockFilters = useAppSelector((state) => state.stockFilters.stockFilters) 
    const dispatch = useAppDispatch()

    const filter = (filters: IStockFilter[]) => {
        const filtersCopy = JSON.parse(JSON.stringify(filters))
        console.log(filtersCopy)
        const filtered = filtersCopy.map((filter :any) => {
            delete filter.id
            filter.value = Number(filter.value)
            return filter
        })
        return filtered
    }

    const {data, error, isFetching } = useGetCustomQuery(filter(stockFilters));

    const handleAddFilterClick = () => {
        dispatch(addFilter())
    }
    
    const handleOnChange = (event : any) => {
        let filterData : IFilterData = {
            id : parseInt((event.currentTarget.parentNode?.parentNode as HTMLElement).id),
            field: (event.currentTarget.parentNode as HTMLElement).id,
            value: event.target.value,
        }
        dispatch(updateFilter(filterData))
    }

    const handleOnDelete = (event: any) => {
        const id = parseInt((event.currentTarget.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement).id)
        dispatch(deleteFilter(id))
    }
    
    const getSelected = (name: string, id: number) => {
        let filterData : IFilterData = {
            id : id,
            field: 'indicator',
            value: name,
        }
        dispatch(updateFilter(filterData))
    }

    const handleSubmit = () => {
        const results = data!.map(e => {
            return JSON.parse(JSON.stringify(e)).Ticker
        })
        dispatch(updateStockResults(results!))
    }
    return (
        <div className="flex flex-1 mt-2">
            <div className="flex flex-1 flex items-center justify-center font-sans overflow-hidden p-2">
                <div className="flex flex-1 flex-col">
                    <table className="w-full table-auto border overflow-visible">
                        <thead className="flex flex-1 w-full bg-gray-200 text-blue-600 text-sm font-light max-h-16">
                            <tr className="flex flex-1 w-full bg-gray-200 text-blue-600 uppercase text-sm leading-normal text-center">
                                {titles.map((title) => {
                                    return (
                                        <th className="flex flex-1 py-3 text-center justify-center p-2" key={title}>{title}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="flex flex-col flex-1 w-full text-blue-600 text-sm font-light overflow-visible">
                            {stockFilters.map((filter, index) => {
                                return (
                                    <tr className="flex flex-1 w-full border-b bg-white border-gray-200 hover:bg-gray-200 hover:hover:shadow-lg h-16 max-h-16 overflow-visible" key={index} id={index.toString()}>
                                        <td className="flex flex-1 py-3 text-center items-stretch justify-center overflow-visible" key={1} id="indicator">
                                            <Select getSelected={getSelected} id={index}/>
                                        </td>
                                        <td className="flex flex-1 py-3 p-2 justify-center " key={2} id="operator">
                                            <input className="flex flex-1 w-full text-center border border-gray-200 rounded-md shadow-sm" onChange={(e) => handleOnChange(e)} />
                                        </td>
                                        <td className="flex flex-1 py-3 p-2 justify-center" key={3} id="value">
                                            <input className="flex flex-1 w-full text-center border border-gray-200 rounded-md shadow-sm"  onChange={(e) => handleOnChange(e)}/>
                                        </td>
                                        <td className="flex flex-1 py-3 text-center" key={4}>
                                            <div className="flex flex-1 py-3 text-center justify-center items-center">
                                                <div className="flex flex-row gap-x-4">
                                                    <button onClick={(e) => handleOnDelete(e)}>
                                                        <XCircleIcon className="w-8 h-8 text-red-500" />
                                                    </button>
                                                    <button onClick={handleAddFilterClick}>
                                                        <PlusCircleIcon className="w-8 h-8" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                            )}
                            <tr className="flex flex-1 w-full border-b bg-white border-gray-200 hover:bg-gray-200 hover:hover:shadow-lg h-16 max-h-16 overflow-visible">
                                <td className="flex flex-1 py-3 text-center h-16">
                                    <div className="flex flex-1 flex-row w-full justify-center items-center">
                                        <button className="flex flex-1 flex-row text-center justify-center items-center h-16" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StockFilterTable;