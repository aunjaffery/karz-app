// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const addNewClient = (name, relation, auth_id) => {
  const collectionRef = collection(db, "users", auth_id, "clients");
  return addDoc(collectionRef, { name, relation });
};

export const addNewTransaction = (data, auth_id) => {
  const collectionRef = collection(db, "users", auth_id, "transactions");
  return addDoc(collectionRef, {
    amount: data?.amount,
    client: data?.client,
    completedOn: null,
    date: Timestamp.fromDate(new Date(data?.date)),
    status: data?.status,
  });
};
export const addNewUser = (uid, email) => {
  const collectionRef = doc(db, "users", uid);
  return setDoc(collectionRef, { uid, email });
};

export const deleteClient = (auth_id, client_id) => {
  return deleteDoc(doc(db, "users", auth_id, "clients", client_id));
};
export const deleteTransaction = (auth_id, transId) => {
  return deleteDoc(doc(db, "users", auth_id, "transactions", transId));
};

export const markTransComplete = (auth_id, transId, date) => {
  const trans = doc(db, "users", auth_id, "transactions", transId);

  return updateDoc(trans, {
    completedOn: Timestamp.fromDate(new Date(date)),
    status: increment(1),
  });
};
