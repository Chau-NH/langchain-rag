import "dotenv/config";
import express, { Express, Request, Response} from "express"
import langchain from "./langchain";
import langchainRetrievalWithoutVectorStores from "./langchain-retrieval-without-vectorstores";


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  langchain();
  res.send("Express + TypeScript Server");
});

app.get("/langchain-retrieval-without-vector-stores", (req: Request, res: Response) => {
  langchainRetrievalWithoutVectorStores();
  res.send("LangChain RAG");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
