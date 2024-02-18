export type TransactionType = "income" | "expense";
export type incomeCategory = "給与" | "副収入" | "お小遣い";
export type expenseCategory =
  | "食費"
  | "日用品"
  | "住居費"
  | "交際費"
  | "娯楽"
  | "交通費";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: incomeCategory | expenseCategory;
}

export interface Balance {
  income: number,
  expense: number,
  balance: number,
}
