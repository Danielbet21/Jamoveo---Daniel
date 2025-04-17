# Use the official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and lock files first for better layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the app code into the container
COPY . .

# Build the Vite project (output goes to 'dist')
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose the port where 'serve' will run the static files
EXPOSE 3000

# Serve the built frontend
CMD ["serve", "-s", "dist", "-l", "3000"]