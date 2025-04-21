# Base Image
FROM node:20-alpine AS BASE
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build Image
FROM node:20-alpine AS BUILD
WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
ARG ENV_FILE
COPY ${ENV_FILE} ./.env
COPY .eslintrc.json ./
RUN npm run build

# Runner Image
FROM node:20-alpine AS RUNNER
WORKDIR /app
ENV NODE_ENV production
COPY --from=BUILD /app ./
EXPOSE 80
CMD ["npm", "run", "start", "--", "--port", "80"]
