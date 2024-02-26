import {
  BaseRetriever,
  type BaseRetrieverInput,
} from "@langchain/core/retrievers";
import type { CallbackManagerForRetrieverRun } from "@langchain/core/callbacks/manager";
import { Document } from "@langchain/core/documents";

export interface CustomRetrieverInput extends BaseRetrieverInput {}

export class CustomRetriever extends BaseRetriever {
  lc_namespace: string[] = ["langchain", "retrievers"];

  constructor(fields?: CustomRetrieverInput) {
    super(fields);
  }

  async _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]> {
    const data = [
      {
        title: "Hello NodeJS",
        description: "JavaScript libraries are emerging as the latest tools for web development. As a result, companies and startups are now looking for MEAN stack developers. This course will help you achieve this by teaching you MEAN stack development through building a Reddit-like application. This course will teach you how to apply MongoDB, Express, Angular, and Node. js in your web development projects. By the end of the course, you will be a confident MEAN stack developer and will be able to build web applications.",
        link: "https://cheddar.learndev.link/content/64d613389a00e3001123fb17"
      },
      {
        title: "NodeJS, MongoDB, and Express: Beginner to Intermediate JavaScript",
        description: "This course is split into 7 sections; section 1 is a fast-paced quick introduction to NodeJS and how you start using NodeJS. We discuss what NodeJS is and that it is not a programming language like JavaScript but an interpreter and environment for JavaScript. Moving further with section 2, we explore the fundamentals of JavaScript and writing JavaScript code within the Node. It is loaded with examples about the basics of coding JavaScript . As Node uses JavaScript code, this section will provide a refresher and quick overview of JavaScript, and is designed to cover core JavaScript required for the upcoming sections and writing Node. JavaScript asynchronous programming explains asynchrony in computer programming, refers to the occurrence of events independent of the main program flow and ways to deal with such events, and shows how to add callbacks that run once a stack is complete. Each module in NodeJS has its own context and cannot interfere with other modules. Modules are like libraries that you can include in your application. Node.js has a set of built-in modules you can use without any further installation, such as http, fs, path, and url. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Explore how to set up a web application quickly with Express. All resources and code files are available",
        link: "https://cheddar.learndev.link/content/6257f235f883650011a48b18"
      },
      {
        title: "Containerize a full-stack NodeJS application in Docker",
        description: "In this 1-hour long project-based course on Intermediate Docker: Containerize a full-stack NodeJS application in Docker and deploy to remote server, you will get to use Docker to stitch together a real full stack NodeJS application in a multi-container architecture. By the end of this course, you will have built a simple blog page, which is a working full-stack application using the MVC (model view controller) framework in NodeJS persisting to a MongoDB database across separate containers and living on one single Docker provided network. You will learn how to stitch all of these services together using Dockerfile and docker-compose files, and get it configured in a remote machine in the cloud, just like if you wanted to run the application from anywhere in the world! Note: This course works best for learners who are based in the North America region. We’re currently working on providing the same experience in other regions.",
        link: "https://cheddar.learndev.link/content/643fbbfde23eb0001136bb27"
      },
    ]
    return [
      new Document({
        pageContent: JSON.stringify(data[0]),
        metadata: {id: 1},
      }),
      new Document({
        pageContent: JSON.stringify(data[1]),
        metadata: {id: 2},
      }),
      new Document({
        pageContent: JSON.stringify(data[2]),
        metadata: {id: 3},
      }),
    ];
  }
}
