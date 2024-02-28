import { Bedrock } from "@langchain/community/llms/bedrock";

const langchainBedrock = async () => {
  const model = new Bedrock({
    model: "ai21.j2-grande-instruct", // You can also do e.g. "anthropic.claude-v2"
    region: "us-east-1",
    // endpointUrl: "custom.amazonaws.com",
    // credentials: {
    //   accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
    //   secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!,
    // },
    // modelKwargs: {},
  });

  const res = await model.invoke("Tell me a joke");
  console.log(res);
};

export default langchainBedrock;
