export interface IStockFilter {
    id?: number | null;
    indicator?: string | null;
    operator?: string | null;
    value?: string | null;
}

export interface IStockFiltersState {
    stockFilters: IStockFilter[];
}
