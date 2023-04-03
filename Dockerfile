FROM node:18.1-alpine

WORKDIR /app
ADD . .

RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]