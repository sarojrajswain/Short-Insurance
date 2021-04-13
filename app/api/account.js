import client from "./client";

const getAccount = (email) => {
  return client.get("/accounts", { email });
};

const saveAccount = (accountInfo) => {
  return client.post("/accounts", accountInfo);
};

const updateAccount = (id, accountInfo) => {
  return client.put("/accounts/" + id, accountInfo);
};

export default { getAccount, saveAccount, updateAccount };
