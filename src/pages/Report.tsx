import { Grid, Paper } from "@mui/material";
import { MonthSelector } from "../components/MonthSelector";
import { CategoryChart } from "../components/CategoryChart";
import { BarChart } from "@mui/icons-material";
import { TransactionTable } from "../components/TransactionTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ja } from "date-fns/locale/ja";

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export const Report = (props: ReportProps) => {
  const { currentMonth, setCurrentMonth } = props;
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
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
            <CategoryChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={commonPaperStyle}>
            <BarChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TransactionTable />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
