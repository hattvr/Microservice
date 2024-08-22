# Stage 1: Build environment (based on Node image)
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev"]