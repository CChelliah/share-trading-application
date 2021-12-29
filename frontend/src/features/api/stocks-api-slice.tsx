import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IStockFilter } from '../../ts/interfaces/IStockFilter'

export const stocksApiSlice = createApi({
  reducerPath: 'stocksAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/',
    prepareHeaders (headers) {
      headers.set('Accept-Encoding', 'gzip, deflate, br')
      headers.set('Accept', '*/*')
      headers.set('Connection', 'keep-alive')
      headers.set('Access-Control-Allow-Origin', '*')
      return headers
    }
  }),
  endpoints (builder) {
    return {
      getCustom: builder.query <string[],IStockFilter[]>({
        query: (filters) => ({
          url: 'shares/custom',
          method: 'POST',
          body: JSON.parse(JSON.stringify(filters))
        })
      })
    }
  }
})

export const { useGetCustomQuery } = stocksApiSlice
