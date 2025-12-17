FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/newwrld-dev/POPKID-XTR.git /root/viper-v2-bot

# Set working directory
WORKDIR /root/viper-v2-bot

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 9090

# Start the bot
CMD ["npm", "start"]
