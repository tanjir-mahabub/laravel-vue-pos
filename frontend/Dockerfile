# Use an official Node.js image as the base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the app will run
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "serve"]