### STAGE 1: Build ###
FROM node:13-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY env.sh env.sh
COPY public/ public/
COPY src/ src/

RUN npm config set '@bit:registry' https://node.bit.dev

RUN npm install
RUN npm run build:no-env

### STAGE 2: Production Environment ###
FROM nginx:1.15.2-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx.default.conf /etc/nginx/conf.d/default.conf
COPY nginx.gzip.conf /etc/nginx/conf.d/gzip.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY env.sh .
COPY .env.example .env

RUN apk add --no-cache bash

RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]