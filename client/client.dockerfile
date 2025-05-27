# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
#install react-router-dom
RUN npm install react-router-dom

# Copy rest of the code
COPY . .

# Start dev server
CMD ["npm", "start"]
