FROM node:17
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm install bcrypt
RUN npm run build
EXPOSE 3001
CMD ["node", "build/server.js"]