# Use Node.js 16
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build for production
RUN npm run build

# Expose application port
EXPOSE 5173

# Start application
CMD ["npm", "run", "serve"]
