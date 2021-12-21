import React, { FC, useEffect, useState } from 'react'
import Select from '../Select'
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addFilter, updateFilter, deleteFilter } from '../../../features/stockFilters/stockFilters-slice'

export interface IStockFilter {
    id? : number;
    indicator?: string | null;
    operator?: string | null;
    value?: number | null;
}

export interface ITable {
    stockFilters?:IStockFilter[];
    titles?: string[];
    onClick?: () => void;
}

const defaultTitles = ['Indicator', 'Operator', 'Value', 'Actions']

const Table:FC<ITable> = ({
    titles = defaultTitles,
}) => {
    const stockFilters = useAppSelector((state) => state.stockFilters.stockFilters) 
    const dispatch = useAppDispatch()

    const handleAddFilterClick = () => {
        dispatch(addFilter())
    }
    const handleOnChange = (event : any) => {
        const payload = updateRowData(event)
        dispatch(updateFilter(payload))
    }
    const updateRowData = (event : any) => {
        const id = parseInt((event.currentTarget.parentNode?.parentNode as HTMLElement).id)
        const filterState = JSON.parse(JSON.stringify(stockFilters[id]));
        const attribute = (event.currentTarget.parentNode as HTMLElement).id
        const value = event.target.value
        if (attribute === 'Operator') {
            filterState['operator'] = value 
        } else if (attribute === 'Value') {
            filterState['value'] = value
        } else {
            filterState['indicator'] = value
        }
        filterState['id'] = id
        return filterState 
    }
    const handleOnDelete = (event: any) => {
        const id = parseInt((event.currentTarget.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement).id)
        dispatch(deleteFilter(id))
    }
    const getSelected = (name: string, id: number) => {
        const filterState = JSON.parse(JSON.stringify(stockFilters[id]))
        filterState['indicator'] = name
        filterState['id'] = id
        console.log(filterState)
        dispatch(updateFilter(filterState))
    }
    return (
        <div className="flex flex-1 m-2">
            <div className="flex flex-1 bg-blue-100 flex items-center justify-center font-sans overflow-hidden p-2">
                <div className="flex flex-1">
                    <table className="w-full table-auto">
                        <thead className="flex flex-1 w-full text-gray-800 text-sm font-light max-h-16">
                            <tr className="flex flex-1 w-full bg-blue-200 text-gray-800 uppercase text-sm leading-normal text-center rounded-md">
                                {titles.map((title) => {
                                    return (
                                        <th className="flex flex-1 py-3 text-center justify-center p-2" key={title}>{title}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="flex flex-col flex-1 w-full text-blue-600 text-sm font-light">
                            {stockFilters.map((filter, index) => {
                                return (
                                    <tr className="flex flex-1 w-full border-b border-blue-200 hover:bg-blue-100 max-h-16" key={index} id={index.toString()}>
                                        <td className="flex flex-1 py-3 text-center items-stretch justify-center" key={1} id="Indicator">
                                            <Select getSelected={getSelected} id={index}/>
                                        </td>
                                        <td className="flex flex-1 py-3 p-2 justify-center" key={2} id="Operator">
                                            <input className="flex flex-1 w-full text-center" onChange={(e) => handleOnChange(e)} />
                                        </td>
                                        <td className="flex flex-1 py-3 p-2 justify-center" key={3} id="Value">
                                            <input className="flex flex-1 w-full text-center"  onChange={(e) => handleOnChange(e)}/>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;