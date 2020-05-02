FROM node:11

WORKDIR /usr/src/app
RUN ls
COPY package*.json .
RUN ls
RUN rm -rf node_modules
RUN yarn
COPY . .
RUN ls
CMD [ "yarn", "run", "start:dev" ]