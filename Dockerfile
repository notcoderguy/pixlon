# Use an official Node.js runtime as a parent image
FROM node:20.13.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Set the working directory
WORKDIR /app

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev" ]
