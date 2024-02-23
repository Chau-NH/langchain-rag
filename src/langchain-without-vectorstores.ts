import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CustomRetriever } from "./utils/CustomRetriever";

const langchainWithoutVectorStores = async () => {
  const model = new ChatOpenAI({});
  const outputParser = new StringOutputParser();
  const retreiver = new CustomRetriever({});
  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
  {context}
  
  Question: {question}`);

  const chain = RunnableSequence.from([
    {
      context: retreiver.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    outputParser,
  ]);
  const response = await chain.invoke("youtube");

  console.log(response);
};

export default langchainWithoutVectorStores;
