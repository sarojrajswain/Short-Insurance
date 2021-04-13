import client from "./client";

const quotePreview = (quoteDetails) => {
  return client.post("/data/quotePreview", quoteDetails);
};

const createQuote = (quoteDetails) => {
  return client.post("/data", quoteDetails);
};

const updateQuote = (policyNumber, quoteDetails) => {
  return client.put("/data/" + policyNumber, quoteDetails);
};

const getQuote = (policyNumber) => {
  return client.get("/data/" + policyNumber);
};

const getAllQuote = () => {
  return client.get("/data");
};

export default {
  quotePreview,
  createQuote,
  updateQuote,
  getQuote,
  getAllQuote,
};
