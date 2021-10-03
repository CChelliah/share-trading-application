import yfinance as yf
import os
import asyncio
from pathlib import Path
import pandas as pd
import csv
from typing import *
from ..classes.calculators.technical_calculator import TechnicalCalculator

class DataUpdater:
    def __init__(self, data):
        self.data = data

    def AddTechnicals(self):
        techical_calculator = TechnicalCalculator(self.data)
        techical_calculator.add_all_technicals()
        self.data = techical_calculator.data
        print(self.data)
        return

