import time
import pandas as pd
from sqlalchemy import create_engine
import psycopg2
from sqlalchemy_utils import database_exists, create_database
from io import StringIO

param_dic = {
    "host" : "db",
    "database" : "shareapplicationdb",
    "user" : "user",
    "password" : "password"
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
        engine = create_engine("postgresql+psycopg2://user:password@db:5432/shareapplicationdb")
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

        #self.add_share_data_mapping(connect)
        self.add_share_data_sqlalchemy(connect)
        return 

    def add_share_data_mapping(self, connect):
        ticker_data = pd.DataFrame(self.tickers, columns = ['Ticker'])
        for i in range(0, len(ticker_data)):
            ticker_data['Id'] = range(1, len(ticker_data) + 1)
        ticker_data.set_index('Id')
        
        cnx = create_engine(connect)

        ticker_data.head(0).to_sql("ShareMapping", con=cnx, if_exists='replace', index=False)
        raw_con = cnx.raw_connection()
        cur = raw_con.cursor()
        out = StringIO()

        ticker_data.to_csv(out, sep='\t', header=False, index=False) 

        out.seek(0) 
        cur.copy_from(out, "ShareMapping", null="")
        raw_con.commit()

        table = '"{}"'.format("ShareMapping")
        cnx.execute("ALTER TABLE public.{} ADD COLUMN Index SERIAL PRIMARY KEY".format(table))

        cnx.execute("ALTER TABLE public.{} ADD CONSTRAINT Unique_ShareMappingIdx UNIQUE (Index)".format(table))

        print("Added table 'ShareMapping' to Database")
        return
        
    def add_share_data_sqlalchemy(self, connect):
       
        cnx = create_engine(connect)

        for i in range(0, len(self.tickers)):
            self.data[i]['Ticker'] = str(self.tickers[i])

        #print(self.data)
        merged_data = pd.concat(self.data, axis=0)

        print(merged_data)
        merged_data.reset_index(level=0, inplace=True)

        #print(f"Total rows in each dataframe = {str(rows)}")
        #print(f"Total rows in merged dataframe = {str(len(merged_data.index))}")
        print(merged_data)
        merged_data.head(0).to_sql("ShareData", con=cnx, if_exists='replace', index=False)
        raw_con = cnx.raw_connection()
        cur = raw_con.cursor()
        out = StringIO()

        merged_data.to_csv(out, sep='\t', header=False, index=False) 

        out.seek(0) 
        cur.copy_from(out, "ShareData", null="")
        raw_con.commit()

        table = '"{}"'.format("ShareData")
        ticker = '"{}"'.format("Ticker")
        cnx.execute("CREATE INDEX Ticker_Idx ON public.{}({})".format(table, ticker))

        cnx.execute("ALTER TABLE public.{} ADD COLUMN Index SERIAL PRIMARY KEY".format(table))

        cnx.execute("ALTER TABLE public.{} ADD CONSTRAINT Unique_ShareIdx UNIQUE (Index)".format(table))

        print("Added table 'ShareData' to Database")
        return

    # def add_data_sqlalchemy(self):
    #     connect = "postgresql+psycopg2://%s:%s@%s:5432/%s" % (
    #         param_dic['user'],
    #         param_dic['password'],
    #         param_dic['host'],
    #         param_dic['database']
    #     )

    #     cnx = create_engine(connect)

    #     print(self.data)
    #     merged_data = zip(self.tickers, self.data)
    #     for ticker, df in merged_data:
    #         table_name = ticker + ".Technicals"
    #         df.head(0).to_sql(table_name, con=cnx,
    #         if_exists='replace', index=False)
    #         raw_con = cnx.raw_connection()
    #         cur = raw_con.cursor()
    #         out = StringIO()

    #         df.to_csv(out, sep='\t', header=False, index=False) 

    #         out.seek(0) 
    #         contents = out.getvalue()
    #         cur.copy_from(out, table_name, null="")
    #         raw_con.commit()

    #         #Change this
    #         ticker_name = ticker.split(".")[0]
    #         table = '"{}"'.format(table_name)
    #         index = '"{}"'.format("Index")

    #         cnx.execute("ALTER TABLE public.{} ADD COLUMN Index SERIAL PRIMARY KEY".format(table))

    #         cnx.execute("ALTER TABLE public.{} ADD CONSTRAINT Unique_{} UNIQUE (Index)".format(table, ticker_name))
            
    #         print("Added {} to Database".format(table_name))
    #     return

