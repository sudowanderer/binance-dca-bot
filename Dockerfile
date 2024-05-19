# Use the official Node.js 20 LTS image as a base
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Define environment variables
ENV NODE_ENV=production

# Command to run the app
CMD ["npm", "start"]