FROM node:10 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:17-alpine3.12
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /app ./
RUN npm install --production --silent && npm prune --production && mv node_modules ../ 
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start:prod"]
