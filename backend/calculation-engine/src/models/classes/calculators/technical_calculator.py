import pandas as pd
import talib as ta

class TechnicalCalculator:
    def __init__(self, data):
        self.data = data

    def add_all_technicals(self):
        self.calculate_macd(self.data)
        self.calculate_stochastic_rsi(self.data)
        self.calculate_on_balance_volume(self.data)
        return self.data

    def calculate_macd(self, data):
        print("Calculating MACD for dataframe.....")
        for ticker_data in data:
            ticker_data["MACD"], ticker_data["MACD Signal"], ticker_data["MACD Hist"] = ta.MACD(ticker_data.Close.values, fastperiod=12, slowperiod=26,signalperiod=9)
        self.data = data
        return

    def calculate_stochastic_rsi(self, data):
        print("Calculating Stochastic RSI for dataframe.....")
        for ticker_data in data: 
            ticker_data["Stoch Fastk"], ticker_data["Stoch Fastd"] = ta.STOCHRSI(ticker_data.Close.values, timeperiod=14, fastk_period=5, fastd_period=3, fastd_matype=0)
        self.data = data
        return
    
    def calculate_on_balance_volume(self, data): 
        print("Calculating On Balance Volume for dataframe.....")
        for ticker_data in data: 
            ticker_data["OBV"] = ta.OBV(ticker_data.astype(float).Close.values, ticker_data.astype(float).Volume.values)
        self.data = data
        return

    