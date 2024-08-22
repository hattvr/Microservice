# BUILD IMAGE
docker build -t front-end .

# RUN IMAGE
docker run -dt -p 3000:3000 front-end