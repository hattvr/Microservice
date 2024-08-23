# BUILD IMAGE
```bash
docker build -t back-end-auth .
```

If you run into issues running on mac, you may need to run the following command to fix the issue:
```bash
docker build --platform linux/amd64 -t back-end-auth .
```

# RUN IMAGE
```bash
docker run -dt -p 8081:8081 back-end-auth
```