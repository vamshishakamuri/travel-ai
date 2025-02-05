# Use Node.js image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package.json .
RUN npm install

# Copy frontend source code and build the React app
COPY . .
RUN npm run build

# Use NGINX to serve frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
