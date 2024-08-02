## Getting Started

.env
please add EXPO_PUBLIC_API_URL your IPv4 localhost ex: http://192.168.1.2:8080/
```
EXPO_PUBLIC_API_URL

```

Second, bash:



.next.config.mjs
please add

```bash

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: your IPv4 localhost ex: "192.168.1.2",
        port: "9444",
      },
    ],
  },
};
```
Third, bash:
run frontend

```bash

npm install

npm run dev 

```