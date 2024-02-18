import { Box } from "@mui/material";
import { MonthlySummary } from "../components/MonthlySummary";
import { Calender } from "../components/Calender";
import { TransactionMenu } from "../components/TransactionMenu";
import { TransactionForm } from "../components/TransactionForm";
import { Transaction } from "../types";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export const Home = (props: HomeProps) => {
  const { monthlyTransactions, setCurrentMonth } = props;
  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};
