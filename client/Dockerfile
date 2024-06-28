FROM node:16 AS build

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build


FROM nginx:alpine


RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/

EXPOSE 4000

CMD [ "npm", "run", "dev" ]