FROM python:3.9.7

WORKDIR /app

ADD requirements.txt requirements.text

RUN wget http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz && \
tar xzvf ta-lib-0.4.0-src.tar.gz && \
cd ta-lib && \
./configure --prefix=/usr &&\ 
make &&\ 
make install &&\
cd .. &&\ 
rm -rf ta-lib*

RUN pip3 install -r requirements.text 

COPY . .

CMD ["python3", "__main__.py", "build"]
