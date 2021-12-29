import yfinance as yf
import os
import asyncio
from pathlib import Path
import pandas as pd
import csv
from typing import *
import time

class DataGetter:
    def __init__(self): 
        self.path = Path(__file__).parents[3] /"data/raw/ASXCompanies.csv"
        self.valid_tickers = None
        self.valid_data = None


    def get_tickers(self) -> List[str]:
        tickers = []
        with open(self.path) as f: 
            reader = csv.reader(f, delimiter=',')
            for row in reader: 
                tickers.append(str(row[1]) + ".AX")
        return tickers

    async def get_all_ticker_data(self):
        start = time.time()
        print("Getting ticker data async....")
        tickers = self.get_tickers()
        print("Tickers are :  {}".format(tickers))
        results = await asyncio.gather(*[self.get_ticker_data(ticker) for ticker in tickers])
        data = ((i,j) for i,j in zip(tickers,results) if j.empty != True)
        self.valid_tickers, self.valid_data = map(list, zip(*data))
        print('It took', time.time()-start, 'seconds.')
        return

    async def get_ticker_data(self, ticker : str):
        print("Getting ticker data for {}".format(ticker))
        data = yf.download(ticker, period="max")
        return data
    
        
    
    


