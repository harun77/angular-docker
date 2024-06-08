# Use the nodejs alpine image
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy all the files from local to image working directory
COPY . .

# Install the dependencies
RUN npm install

# Install angular cli
RUN npm install -g @angular/cli@17.3.3

# Build the application
RUN ng build --configuration production

# Use nginx alpine image
FROM nginx:alpine

# Upload the dist files of the app into the nginx html directory
COPY --from=build /app/dist/angular-docker/browser /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]