import time
import pandas as pd
from sqlalchemy import create_engine
import psycopg2
from sqlalchemy_utils import database_exists, create_database
from io import StringIO

param_dic = {
    "host" : "localhost",
    "database" : "shareapplication",
    "user" : "cavinashchelliah",
    "password" : #Removed
}

class DataLoader: 
    def __init__(self, tickers, data):
        self.conn = None
        self.tickers = tickers
        self.data = data

    def setup_database(self):
        self.create_database()
        self.add_data_sqlalchemy()
        return

    def create_database(self):
        engine = create_engine("postgresql://localhost/shareapplication")
        if not database_exists(engine.url):
            create_database(engine.url) 
        return

    def add_data_sqlalchemy(self):
        connect = "postgresql+psycopg2://%s:%s@%s:5432/%s" % (
            param_dic['user'],
            param_dic['password'],
            param_dic['host'],
            param_dic['database']
        )

        cnx = create_engine(connect)

        print(self.data)
        merged_data = zip(self.tickers, self.data)
        for ticker, df in merged_data:
            table_name = ticker + ".Technicals"
            df.head(0).to_sql(table_name, con=cnx, index=False, if_exists='replace')
            raw_con = cnx.raw_connection()
            cur = raw_con.cursor()
            out = StringIO()

            df.to_csv(out, sep='\t', header=False, index=False) 

            out.seek(0) 
            contents = out.getvalue()
            cur.copy_from(out, table_name, null="")
            raw_con.commit()

            print("Added {} to Database".format(table_name))
        return
            


