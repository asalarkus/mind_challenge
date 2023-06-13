FROM node:14.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV dev

CMD ["npm", "start"]