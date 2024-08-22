# BUILD IMAGE
```bash
docker build -t back-end-customer .
```

If you run into issues running on mac, you may need to run the following command to fix the issue:
```bash
docker build --platform linux/amd64 -t back-end-customer .
```

# RUN IMAGE
```bash
docker run -dt -p 8080:8080 back-end-customer
```