# Base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
