import axios from "axios";
import Domain from "./Endpoint";

export const addNewClient = async (client) => {
  const rsp = await axios.post(`${Domain}/api/user/createClient`, client);
  return rsp.data;
};

export const fetchUserClients = async () => {
  const rsp = await axios(`${Domain}/api/user/getUserClients`);
  return rsp.data;
};

export const deleteClient = async (id) => {
  const rsp = await axios.delete(`${Domain}/api/user/deleteClient/${id}`);
  return rsp.data;
};

export const addNewTransaction = async (data) => {
  const rsp = await axios.post(`${Domain}/api/user/createTransaction`, data);
  return rsp.data;
};

export const fetchTransactions = async () => {
  const rsp = await axios(`${Domain}/api/user/getTransactions`);
  return rsp.data;
};
export const getTransactionDetails = async ({ queryKey }) => {
  const [_, trans_id] = queryKey;
  console.log("<== api", trans_id);
  const rsp = await axios.get(`${Domain}/api/user/getTransactionDetails`, {
    params: { trans_id },
  });
  return rsp.data;
};

export const deleteTransaction = async (id) => {
  const rsp = await axios.delete(`${Domain}/api/user/deleteTransaction/${id}`);
  return rsp.data;
};
export const markTransaction = async (data) => {
  const rsp = await axios.post(`${Domain}/api/user/markTransaction`, data);
  return rsp.data;
};
