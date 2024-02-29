import { ChatOpenAI } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CustomRetriever } from "./utils/CustomRetriever";

const langchain = async (
  userQuestion: any
) => {
  const model = new ChatOpenAI({});
  const outputParser = new StringOutputParser();
  const retreiver = new CustomRetriever({});

  const systemTemplate = `Answer the question based only on the following context.
1. If you don't know the answer, don't try to make up an answer.
2. The assistant produces creative and structured responses.
3. Add 3 links and titles related to the quesion together if they exist in provided context.
----------------
{context}`;

  const messages = [
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
  ];

  const prompt = ChatPromptTemplate.fromMessages(messages);

  const chain = RunnableSequence.from([
    {
      context: retreiver.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    outputParser,
  ]);

  const response = await chain.invoke(userQuestion);
  return `AI ANSWER: \n ${response}`;
};

export default langchain;
