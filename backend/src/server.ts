import "dotenv/config";
import cors from "cors";
import { serverRoutes } from "./api/server.routes";
import express, { Request, Response } from "express";
import errorHandler from "./middlewares/error.middleware";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

export const corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));

server.use("/api", serverRoutes);

server.get("/", (_req: Request, res: Response) => {
  res.status(200).json(`<h2>Home Page ...</h2>`);
});

server.use(errorHandler);

server.use((_req: Request, res: Response) => {
  res.status(404).send("<h3>404 Page Not Found !</h3>This page doesn't exist, Sorry !");
});

const port = process.env.SERVER_PORT || 1000;
const testPort = process.env.TEST_PORT;

if (process.env.ENV === "test") {
  server.listen(testPort, () => {
    console.log(`server running on test port ${testPort}...\n`);
  });
} else
  server.listen(port, () => {
    console.log(`server running on port ${port}...\n`);
  });

export default server;
