import axios from "axios";
import Domain from "./Endpoint";

export const updateUserName = async (name) => {
  const rsp = await axios.post(`${Domain}/api/user/changeName`, name);
  return rsp.data;
};

export const changeUserPass = async (data) => {
  const rsp = await axios.post(`${Domain}/api/user/changePass`, data);
  return rsp.data;
};

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

export const fetchTransactions = async ({ queryKey }) => {
  const [_, data] = queryKey;
  const rsp = await axios.post(`${Domain}/api/user/getTransactions`, data);
  return rsp.data;
};
export const getTransactionDetails = async ({ queryKey }) => {
  const [_, trans_id] = queryKey;
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

export const getChartData = async () => {
  const rsp = await axios(`${Domain}/api/user/pieTransaction`);
  return rsp.data;
};
export const getWeeklyExp = async () => {
  const rsp = await axios(`${Domain}/api/user/weeklyExpense`);
  return rsp.data;
};
export const getMonthlyExp = async () => {
  const rsp = await axios(`${Domain}/api/user/monthlyExpense`);
  return rsp.data;
};

export const createNewExpense = async (data) => {
  const rsp = await axios.post(`${Domain}/api/user/createExpense`, data);
  return rsp.data;
};
export const fetchUserExpenses = async ({ queryKey }) => {
  const [_, data] = queryKey;
  const rsp = await axios.post(`${Domain}/api/user/getExpenses`, data);
  return rsp.data;
};
export const deleteExpense = async (id) => {
  const rsp = await axios.delete(`${Domain}/api/user/deleteExpense/${id}`);
  return rsp.data;
};
