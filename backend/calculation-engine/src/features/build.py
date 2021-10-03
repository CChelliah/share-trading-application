
from ..models.classes.data_getter import DataGetter
from ..models.classes.data_updater import DataUpdater
from ..models.classes.data_loader import DataLoader
import asyncio
import time

def main():
    print("Starting build.........")
    get_start = time.time()
    yfinance_data_getter = DataGetter()
    asyncio.run(yfinance_data_getter.get_all_ticker_data())
    get_time = time.time() - get_start
    
    update_start = time.time()
    data_updater = DataUpdater(yfinance_data_getter.valid_data)
    data_updater.AddTechnicals()
    update_time = time.time() - update_start

    load_start = time.time()
    data_loader = DataLoader(yfinance_data_getter.valid_tickers, data_updater.data)
    data_loader.setup_database()
    load_time = time.time() - load_start   

    print("Total time to get data {} seconds".format(get_time))
    print("Total time to update data {} seconds".format(update_time))
    print("Total time to load data {} seconds".format(load_time))
    print("Ending Build")


if __name__ == '__main__':
    main()