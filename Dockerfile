# Use an official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
