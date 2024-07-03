FROM node:22

ADD package.json package-lock.json /app
WORKDIR /app
RUN npm ci
ADD . /app
RUN npm run build
CMD ["npm", "start"]
