import { IStockFilter } from './IStockFilter'

export interface IStockFilterTable {
    stockFilters?:IStockFilter[];
    titles: string[];
    onClick?: () => void;
}