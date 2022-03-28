import "dotenv/config";
import cors from "cors";
import { serverRoutes } from "./api/server.routes";
import express, { Request, Response } from "express";
import errorHandler from "./middlewares/error.middleware";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export const corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", serverRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json(`<h2>Home Page ...</h2>`);
});

app.use(errorHandler);

app.use((_req: Request, res: Response) => {
  res.status(404).send(
    `
    <h3>404 Page Not Found !</h3>
    This page doesn't exist, Sorry !
    `
  );
});

const port = process.env.SERVER_PORT || 4000;
app.listen(port, async () => {
  console.log(`server running on port ${port}...\n`);
});

export default app;
