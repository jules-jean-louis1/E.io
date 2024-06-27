# Server/Dockerfile
FROM node:16

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]