# Build stage
FROM node:10-alpine as build-stage
WORKDIR /app
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
