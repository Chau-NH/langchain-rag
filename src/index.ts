import "dotenv/config";
import express, { Express, Request, Response} from "express"
import langchain from "./langchain";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/langchain", (req: Request, res: Response) => {
  langchain(req.query.question).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
