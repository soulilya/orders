FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

COPY . .

RUN npm i -g @adonisjs/cli

CMD ["adonis", "install", "@adonisjs/validator"]
CMD [ "adonis", "migration:run", "--force" ]
CMD [ "adonis", "serve"]
