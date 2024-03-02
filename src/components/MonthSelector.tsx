import { Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addMonths } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export const MonthSelector = (props: MonthSelectorProps) => {
  const { currentMonth, setCurrentMonth } = props;

  const handleDateChange = (newDate: Date | null) => {
    if (newDate === null) return;
    setCurrentMonth(newDate);
  }

  // 先月を選択したときの処理
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previousMonth);
  };

  // 次月を選択したときの処理
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alighItems: "center" }}
    >
      <Button onClick={handlePreviousMonth} color={"error"} variant="contained">
        先月
      </Button>
      <DatePicker
        onChange={handleDateChange}
        value={currentMonth}
        label="年月を選択"
        sx={{ mx: 2, background: "white" }}
        views={["year", "month"]}
        format="yyyy/MM"
        slotProps={{
          toolbar: {
            toolbarFormat: "yyyy年MM月",
          },
        }}
      />
      <Button onClick={handleNextMonth} color={"primary"} variant="contained">
        次月
      </Button>
    </Box>
  );
};
