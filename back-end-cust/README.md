# BUILD IMAGE
docker build -t back-end-customer .

# RUN IMAGE
docker run -dt -p 8080:8080 back-end-customer