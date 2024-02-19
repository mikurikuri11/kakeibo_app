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
import { addDoc, collection, getDocs } from "firebase/firestore";
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
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
