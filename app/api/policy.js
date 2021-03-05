import client from "./client";

const quotePreview = (quoteDetails) => {
  return client.post("/data/quotePreview", quoteDetails);
};

export default { quotePreview };
