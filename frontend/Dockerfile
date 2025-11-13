FROM node:22-bullseye AS builder

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && \
    npm install --force

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
