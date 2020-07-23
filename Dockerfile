#
# Dev stage.
#
FROM node:12.13.0

# Make port 80 available to the world outside this container
EXPOSE 80
# Set some variable environment.
ARG stage
ARG configs
ENV AWS_DEFAULT_REGION eu-west-1
ENV STAGE $stage
ENV CONFIGS $configs
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install \
  && npm install webpack -g \
  && npm install webpack-cli -g
# Copying compilation dependencies
COPY webpack.config.js /usr/src/app/
COPY tsconfig.json /usr/src/app/
# Bundle app source
COPY env /usr/src/app/env
COPY src /usr/src/app/src
# Transpiling
RUN node --max-old-space-size=1900 ./node_modules/webpack/bin/webpack.js --config webpack.config.js

# Run src/app.js when the container launches
CMD ["node","dist/app.js"]
