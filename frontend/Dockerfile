FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5177

CMD ["npm", "run", "dev"]
