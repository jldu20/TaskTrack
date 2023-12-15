# Use an appropriate base image
FROM node:21
WORKDIR /usr/app
# Copy the application files into the container (assuming they are in the same directory as the Dockerfile)
COPY . ./

# Install application dependencies
RUN npm install
RUN npm install mongodb
# Expose the port the app runs on (if applicable)
EXPOSE 4005

# Command to run the application (for example, a Node.js app)
CMD ["npm", "start"]