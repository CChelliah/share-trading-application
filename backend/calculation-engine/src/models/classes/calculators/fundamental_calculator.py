import pandas as pd
import talib as ta

class FundamentalCalculator:
    def __init__(self, data):
        self.df = data
