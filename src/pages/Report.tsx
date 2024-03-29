import { Grid, Paper } from "@mui/material";
import { MonthSelector } from "../components/MonthSelector";
import { CategoryChart } from "../components/CategoryChart";
import { BarChart } from "../components/BarChart";
import { TransactionTable } from "../components/TransactionTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ja } from "date-fns/locale/ja";
import { Transaction } from "../types";

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
  onDeleteTransaction: (
    transactionIds: string | readonly string[]
  ) => Promise<void>;
}

export const Report = (props: ReportProps) => {
  const {
    currentMonth,
    setCurrentMonth,
    monthlyTransactions,
    isLoading,
    onDeleteTransaction,
  } = props;
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
      dateFormats={{ monthAndYear: "yyyy年 MM月" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MonthSelector
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={commonPaperStyle}>
            <CategoryChart
              monthlyTransactions={monthlyTransactions}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={commonPaperStyle}>
            <BarChart
              monthlyTransactions={monthlyTransactions}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TransactionTable
            monthlyTransactions={monthlyTransactions}
            onDeleteTransaction={onDeleteTransaction}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
