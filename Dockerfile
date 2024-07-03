FROM node:latest

ADD package.json package-lock.json /app
WORKDIR /app
RUN npm ci
ADD . /app
RUN npm build
CMD ["npm", "start"]
