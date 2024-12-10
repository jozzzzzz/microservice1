FROM node:22 AS api-builder

WORKDIR /app

COPY ./src/ .
COPY package.json .
COPY tsconfig.json .

RUN npm install 

RUN npm run build


FROM node:22.12.0-alpine

WORKDIR /app

COPY --from=api-builder /app/dist/ .
COPY --from=api-builder /app/package*.json .
COPY .env .

RUN npm install --only=production

EXPOSE 3000

CMD [ "node", "main.js" ]