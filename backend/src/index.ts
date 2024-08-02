import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
// routes
import apartmentRouter from "./routes/apartment.router";
// swagger docs
import { specs, swaggerUi } from "./utils/swagger";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

// test server
app.get("/ping", (req, res) => {
  res.json({ message: "pong" }).status(200);
});

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes

app.use("/apartments", apartmentRouter);

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
