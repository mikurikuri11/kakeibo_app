import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionType,
} from "../types";

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

export const CategoryChart = (props: CategoryChartProps) => {
  const { monthlyTransactions, isLoading } = props;
  const theme = useTheme();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [selectedType, setSelectedType] = useState<TransactionType>("expense");
  const handleChange = (e: SelectChangeEvent<"income" | "expense">) => {
    setSelectedType(e.target.value as TransactionType);
  };

  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>(
      (acc, transaction) => {
        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
      },
      {} as Record<IncomeCategory | ExpenseCategory, number>
    );

  const categoryLabels = Object.keys(categorySums) as (
    | IncomeCategory
    | ExpenseCategory
  )[];
  const categoryData = Object.values(categorySums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const incomeCategoryColor: Record<IncomeCategory, string> = {
    給与: theme.palette.incomeCategoryColor.給与,
    副収入: theme.palette.incomeCategoryColor.副収入,
    お小遣い: theme.palette.incomeCategoryColor.お小遣い,
  };

  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    食費: theme.palette.expenseCategoryColor.食費,
    日用品: theme.palette.expenseCategoryColor.日用品,
    住居費: theme.palette.expenseCategoryColor.住居費,
    交際費: theme.palette.expenseCategoryColor.交際費,
    娯楽: theme.palette.expenseCategoryColor.娯楽,
    交通費: theme.palette.expenseCategoryColor.交通費,
  };

  const getCategoryColor = (category: IncomeCategory | ExpenseCategory) => {
    if (selectedType === "income") {
      return incomeCategoryColor[category as IncomeCategory];
    } else {
      return expenseCategoryColor[category as ExpenseCategory];
    }
  };

  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        label: "# of Votes",
        data: categoryData,
        backgroundColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="収支の種類"
          onChange={handleChange}
        >
          <MenuItem value={"income"}>収入</MenuItem>
          <MenuItem value={"expense"}>支出</MenuItem>
        </Select>
        <Box
          sx={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : monthlyTransactions.length === 0 ? (
            <Typography>データがありません</Typography>
          ) : (
            <Pie options={options} data={data} />
          )}
        </Box>
      </FormControl>
    </>
  );
};
