## Getting Started

.env
please add S3_NINJA_ENDPOINT your IPv4 localhost ex: http://192.168.1.2:9444
```
DATABASE_URL="postgres://postgres:postgres@localhost:5433/crud"
S3_NINJA_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE
S3_NINJA_SECRET_KEY_ID = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_NINJA_BUCKET_NAME= crud
S3_NINJA_ENDPOINT= 
S3_NINJA_REGION= us-east-1

```

Second, bash:


```bash
npm install

docker compose up # To run postgresql & s3 ninja

npm run dev

```

### please go to s3-ninja on http://localhost:9444 and create crud bucket