import React, { useReducer, createContext, useState, useEffect } from "react";

import contextReducer from "./contextReducer";
import { useUser } from "./userContext";
import { child, onValue, push, ref, remove } from "firebase/database";
import { db } from "../config/firebase";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 500,
    category: "Salary",
    type: "Income",
    date: "2020-11-16",
    id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  },
  {
    amount: 225,
    category: "Investments",
    type: "Income",
    date: "2020-11-16",
    id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  },
  {
    amount: 50,
    category: "Salary",
    type: "Income",
    date: "2020-11-13",
    id: "270304a8-b11d-4e16-9341-33df641ede64",
  },
  {
    amount: 123,
    category: "Car",
    type: "Expense",
    date: "2020-11-16",
    id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
  },
  {
    amount: 50,
    category: "Pets",
    type: "Expense",
    date: "2020-11-13",
    id: "c5647dde-d857-463d-8b4e-1c866cc5f83e",
  },
  {
    amount: 500,
    category: "Travel",
    type: "Expense",
    date: "2020-11-13",
    id: "365a4ebd-9892-4471-ad55-36077e4121a9",
  },
  {
    amount: 50,
    category: "Investments",
    type: "Income",
    date: "2020-11-23",
    id: "80cf7e33-fc3e-4f9f-a2aa-ecf140711460",
  },
  {
    amount: 500,
    category: "Savings",
    type: "Income",
    date: "2020-11-23",
    id: "ef090181-21d1-4568-85c4-5646232085b2",
  },
  {
    amount: 5,
    category: "Savings",
    type: "Income",
    date: "2020-11-23",
    id: "037a35a3-40ec-4212-abe0-cc485a98aeee",
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const { user } = useUser();
  const [transactionsList, dispatch] = useReducer(contextReducer, initialState);
  const [transactions, setTransactions] = useState(transactionsList);
  const [balance, setBalance] = useState(
    transactionsList.reduce(
      (acc, currVal) =>
        currVal.type === "Expense"
          ? acc - currVal.amount
          : acc + currVal.amount,
      0
    )
  );

  const deleteTransaction = (id) => {
    if (user) {
      const userRef = ref(db, user.uid);
      const transactionsChild = child(userRef, "transactions");
      onValue(transactionsChild, (snapshot) => {
        const data = snapshot.val();
        const transactionKeys = Object.keys(data);
        const transactionId = Object.values(data).findIndex((t) => t.id === id);
        const transactionToDelete = child(
          transactionsChild,
          transactionKeys[transactionId]
        );
        console.log(transactionToDelete);
        remove(transactionToDelete);
      });
    } else dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    if (user) {
      const userRef = ref(db, user.uid);
      const transactionsChild = child(userRef, "transactions");
      push(transactionsChild, transaction);
    } else dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  useEffect(() => {
    if (user) {
      const userRef = ref(db, user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data.transactions)
          setTransactions(Object.values(data.transactions));
        else setTransactions([]);
      });
    } else {
      setTransactions(transactionsList);
    }
  }, [user, transactionsList]);

  useEffect(() => {
    setBalance(
      transactions.reduce(
        (acc, currVal) =>
          currVal.type === "Expense"
            ? acc - currVal.amount
            : acc + currVal.amount,
        0
      )
    );
  }, [transactions]);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        balance,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
