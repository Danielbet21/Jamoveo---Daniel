# Use the official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the app code into the container
COPY . .

# Install project dependencies
RUN npm install

# Build the Vite project (output goes to 'dist')
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Expose the port where 'serve' will run the static files
EXPOSE 80

# Serve the built frontend
CMD ["serve", "-s", "dist", "-l", "80"]