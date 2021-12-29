import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { IStockResultsTable } from '../../../ts/interfaces/IStockResultsTable'


const StockResultsTable: FC<IStockResultsTable> = ({
}) => {
    const stockResults = useAppSelector((state) => state.stockResults.stockResults) 
    return (
        <div className="flex flex-1 mt-2">
            <div className="flex flex-1 bg-white flex items-center justify-center font-sans overflow-hidden p-2">
                <div className="flex flex-1">
                    <table className="w-full table-auto border border-gray-200">
                        <thead className="flex flex-1 w-full text-blue-600 text-sm font-light max-h-16">
                            <tr className="flex flex-1 w-full bg-gray-200 text-gray-800 uppercase text-sm leading-normal text-center">
                                <th className="flex flex-1 py-3 text-center justify-center p-2 text-blue-600">Results</th>
                            </tr>
                        </thead>
                        <tbody className="flex flex-col flex-1 w-full text-blue-600 text-sm font-light">
                            {typeof(stockResults) != 'undefined' && stockResults.length > 0 ? stockResults.map((result,index) => {
                                return (
                                    <tr className="flex flex-1 w-full border-b border-gray-200 hover:bg-gray-200 h-16 max-h-16" key={index}>
                                        <td className="flex flex-1 py-2 text-center items-stretch justify-center items-center h-16">
                                        {result}
                                        </td>
                                    </tr>
                                );
                            }
                            ) : 
                                <tr className="flex flex-1 w-full border-b border-gray-200 hover:bg-gray-200 h-16 max-h-16 align-middle">
                                    <td className="flex flex-1 py-2 text-center items-stretch justify-center align-middle h-16">
                                    No Results 
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StockResultsTable;