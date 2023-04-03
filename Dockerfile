FROM node:18.1-alpine

WORKDIR /app
ADD . .

RUN npm install
ENTRYPOINT [ "npm", "start" ]