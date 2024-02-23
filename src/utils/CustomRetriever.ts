import { CallbackManagerForRetrieverRun } from "langchain/callbacks";
import {
  BaseRetriever,
  type BaseRetrieverInput,
} from "langchain/schema/retriever";
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
    return [

      new Document({
        pageContent: "Facebook was founded by Mark Zuckerberg along with his college roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes in February 2004. It initially started as a social networking platform exclusively for Harvard University students before expanding to other universities and eventually the general public",
        metadata: {id: 1},
      }),
      new Document({
        pageContent: "Facebook allows users to create profiles, connect with friends and family, share updates, photos, videos, and links, join groups, create pages for businesses, organizations, or public figures, and engage with content through likes, comments, and shares.",
        metadata: {id: 2},
      }),
      new Document({
        pageContent: "Facebook has billions of active users worldwide. As of my last update, it had over 2.8 billion monthly active users. This makes it one of the most popular social networking platforms globally.",
        metadata: {id: 3},
      }),
    ];
  }
}
