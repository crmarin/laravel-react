FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

ENV NODE_ENV=deveploment

EXPOSE 3000

CMD ["yarn", "run", "dev"]