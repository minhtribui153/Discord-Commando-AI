# Install Node Image
FROM node:latest

# Create Discord Bot directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot


# Copy package.json and Install the Discord Bot
COPY package.json /usr/src/bot
RUN npm install

# Copy all Discord Bot folders
COPY . /usr/src/bot

# Startup the Discord Bot
CMD [ "npm", "start" ] # Modify this command into the startup command to startup the bot
