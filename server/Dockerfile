FROM node:18.16.0-alpine

WORKDIR /api

COPY package.json ./
RUN npm i

COPY index.js ./
COPY .env ./

EXPOSE 8000

CMD ["npm", "start"]