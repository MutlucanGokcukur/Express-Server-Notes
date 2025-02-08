# Use the latest version of Node.js
FROM node:16

ENV TZ=Asia/Istanbul

# Switch to the application directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install necessary dependencies
RUN npm install --no-bin-links

# Copy application files
COPY . .

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
