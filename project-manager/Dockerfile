# Use an appropriate base image
FROM node:21 as build

# Copy the application files into the container (assuming they are in the same directory as the Dockerfile)
COPY . .

# Install application dependencies
RUN npm install
RUN npm install mongodb
RUN npm run build
# Expose the port the app runs on (if applicable)
EXPOSE 3000
ENV HOST=0.0.0.0
# Command to run the application (for example, a Node.js app)
CMD ["node", "build/index.js"]