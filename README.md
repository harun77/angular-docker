# Angular app deploy in Nginx with Docker 

# Step 1: Clone the app
git clone ...

# Step 2: Build the image
docker build -t angular-docker:v1 .

# Step 3: Run the container
docker run -d -p 80:80 angular-docker:v1