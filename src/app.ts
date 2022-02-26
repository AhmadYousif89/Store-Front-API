import { routes } from "./routes/app";
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use("/", routes);

export const corsOps = {
  origin: process.env.PG_HOST,
  optionsSuccessStatus: 200,
};
app.get("/", cors(corsOps), (_req: Request, res: Response) => {
  res.send(`<h2>Home Page ...</h2>`);
});

const port = process.env.SERVER_PORT || 2020;
app.listen(port, () => console.log(`server running on port ${port}...\n`));

export default app;
