FROM node:12

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app

# Caching the dependencies
RUN npm install

COPY . /app
# Installing the app - not sure if anything else than dependency installation happens here
RUN npm install


