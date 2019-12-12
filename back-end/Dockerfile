FROM node:10-alpine

# Set node environment, either development or production.
# The default is production but Docker compose may override this to development.
# If set to production, no dev-dependencies will be installed.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Default to port 3000 for Node
ARG PORT=3001
ENV PORT $PORT
ENV BUCKET_NAME $BUCKET_NAME
ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID 
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
ENV AWS_REGION $AWS_REGION

EXPOSE $PORT

# Install the latest NPM for speed and fixes.
# Pin this version for the best stability.
RUN npm i npm@latest -g

# Set working directory within the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
#\
#&& mv /app/node_modules /node_modules

COPY . ./

#COPY server/server.js .
#COPY build build

# Start server
CMD ["node", "server.js"]