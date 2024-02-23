import "dotenv/config";
import express, { Express, Request, Response} from "express"
import langchain from "./langchain";
import langchainWithoutVectorStores from "./langchain-without-vectorstores";


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  langchain();
  res.send("Express + TypeScript Server");
});

app.get("/without-vector-stores", (req: Request, res: Response) => {
  langchainWithoutVectorStores();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
