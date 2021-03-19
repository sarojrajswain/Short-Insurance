import client from "./client";

const getAccount = (email) => {
  return client.get("/accounts", { email });
};

const saveAccount = (accountInfo) => {
  return client.post("/accounts", accountInfo);
};

export default { getAccount, saveAccount };
