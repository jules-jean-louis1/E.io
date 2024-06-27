# Client/Dockerfile
FROM node:16

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]