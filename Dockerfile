FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package manifest first and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY . .

ENV NODE_ENV=production

# Use the normal start script (node index.js)
CMD ["npm", "run", "start"]
FROM node:lts

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
