# Use a lightweight official Node runtime base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy application configuration files
COPY package*.json ./

# Install runtime dependencies
RUN npm install --only=production

# Copy remaining source code files
COPY server.js .

# Expose the internal network port
EXPOSE 8080

# Define start execution command
CMD [ "npm", "start" ]
