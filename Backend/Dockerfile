# Backend Dockerfile
# Uses a slim official Node image for stability and smaller size

FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies based on the lockfile when available
COPY package*.json ./
# prefer npm ci when lockfile present, otherwise fallback to npm install
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi

# Copy source
COPY . .

# Default environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
