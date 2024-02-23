import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const langchain = async () => {
  const model = new ChatOpenAI({});
  const outputParser = new StringOutputParser();
  const vectorStore = await HNSWLib.fromTexts(
    [
      // Result 1
      "Facebook was founded by Mark Zuckerberg along with his college roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes in February 2004. It initially started as a social networking platform exclusively for Harvard University students before expanding to other universities and eventually the general public",

      // Result 2
      "Facebook allows users to create profiles, connect with friends and family, share updates, photos, videos, and links, join groups, create pages for businesses, organizations, or public figures, and engage with content through likes, comments, and shares.",

      // Result 3
      "Facebook has billions of active users worldwide. As of my last update, it had over 2.8 billion monthly active users. This makes it one of the most popular social networking platforms globally."
    ],
    [{id : 1}, {id : 2}, {id : 3}],
    new OpenAIEmbeddings()
  );
  const retreiver = vectorStore.asRetriever(1) ;
  const prompt = PromptTemplate.fromTemplate(`Answer the question based only on the following context:
  {context}
  
  Question: {question}`);

  const chain = RunnableSequence.from([
    {
      context: retreiver.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough()
    },
    prompt,
    model,
    outputParser
  ]);
  const response = await chain.invoke("What is Facebook?");
 
  console.log(response);
};

export default langchain;
