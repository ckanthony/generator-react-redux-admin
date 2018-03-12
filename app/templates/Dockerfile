# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Set all environment variable
ENV API_URL=<%= API_URL %>

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm install
RUN npm run build
RUN rm -rf .git
RUN rm -rf node_modules
RUN rm -rf src
RUN rm -rf public

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD serve --single dist

# Tell Docker about the port we'll run on.
EXPOSE 5000