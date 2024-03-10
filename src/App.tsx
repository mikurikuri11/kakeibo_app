import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Report } from "./pages/Report";
import { NoMatch } from "./pages/NoMatch";
import { AppLayout } from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { Transaction } from "./types";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {
  // FireStoreエラーかどうかを判定する型ガード関数
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // FireStoreからデータを取得する
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        setTransactions(transactionsData);
      } catch (error) {
        if (isFireStoreError(error)) {
          console.error("Firestore Error", error.code, error.message);
        } else {
          console.error("Unknown Error", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // 月次の取引データを取得する
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引データを保存する
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTranction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTranction,
      ]);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("Firestore Error", error.code, error.message);
      } else {
        console.error("Unknown Error", error);
      }
    }
  };

  // 取引データを削除する
  const handleDeleteTransaction = async (
    transactionIds: string | readonly string[]
  ) => {
    try {
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }
      const updatedTransactions = transactions.filter(
        (t) => !idsToDelete.includes(t.id)
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("Firestore Error", error.code, error.message);
      } else {
        console.error("Unknown Error", error);
      }
    }
  };

  // 取引データを更新する
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("Firestore Error", error.code, error.message);
      } else {
        console.error("Unknown Error", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route
              path="/report"
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  isLoading={isLoading}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
