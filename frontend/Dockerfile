FROM node:22-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm install

COPY . .

FROM node:22-bullseye

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5177

CMD ["npm", "run", "dev"]
