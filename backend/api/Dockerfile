FROM node

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3002 

CMD [ "node", "app.js" ]
