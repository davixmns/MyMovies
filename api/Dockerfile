FROM node:20.11 as build

# Download and install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Instala o bcrypt
RUN yarn add bcrypt

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]

# Run the app, waiting for the database to be available
CMD dockerize -wait tcp://mymovies-database:3306 -timeout 10s yarn start

