import "dotenv/config";
import cors from "cors";
import { appRoutes } from "./api/appRoutes";
import express, { Request, Response } from "express";
import serverErrors from "./middlewares/error";
import notFound from "./middlewares/notFound";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export const corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", appRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json(`<h2>Home Page ...</h2>`);
});

app.use(serverErrors);
app.use(notFound);

const port = process.env.SERVER_PORT || 1000;
const testPort = process.env.TEST_PORT;

if (process.env.ENV === "test") {
  app.listen(testPort, () => {
    console.log(`server running on test port ${testPort}...\n`);
  });
} else
  app.listen(port, () => {
    console.log(`server running on port ${port}...\n`);
  });

export default app;
