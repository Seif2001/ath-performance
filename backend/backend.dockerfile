FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma

RUN npx prisma generate
COPY . .

EXPOSE 4000
# Install nodemon globally
RUN npm install -g nodemon

# Use nodemon to auto-restart on changes
CMD ["nodemon", "index.js"]
