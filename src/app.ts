import "dotenv/config";
import cors from "cors";
import { routes } from "./routes/app";
import express, { Request, Response } from "express";
import errorHandler from "./routes/middlewares/error.middleware";

const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json(`<h2>Home Page ...</h2>`);
});

app.use(errorHandler);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    msg: "Please read our API documention to know how to use the application, Good Luck !",
  });
});

export const corsOptions = {
  origin: process.env.PG_HOST,
  optionsSuccessStatus: 200,
};

const port = process.env.SERVER_PORT || 2020;

app.listen(port, () => console.log(`server running on port ${port}...\n`));

export default app;
