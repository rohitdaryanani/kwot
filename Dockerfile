FROM node:latest

EXPOSE 3000

WORKDIR /kwot

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "node", "index.js" ]