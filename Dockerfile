FROM node:18-alpine as base

# Set working directory
WORKDIR /usr/build

# Copy files into container
COPY . .

# Install dependencies
RUN npm install

# Run server
CMD ["node", "app.js"]