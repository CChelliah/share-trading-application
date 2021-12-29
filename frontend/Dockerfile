FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./
RUN npm install --force

COPY . .

EXPOSE 3000 

CMD [ "npm", "run", "start"]
