# TODO: set different dockerfile for prod refering to https://blog.vishnuprasaath.dev/dockerize-react-app-for-dev-and-prod
# Stage 1 react app
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 nginx
# Use an official Nginx image as a parent image
FROM nginx:alpine

# Copy the built React application from the build stage to the Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
