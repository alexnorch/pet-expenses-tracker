import { useSelector } from "react-redux";
import { displayMonth } from "../../util/displayMonth";
import Chart from "../ui/Chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ExpensesChart = () => {
  const expensesData = useSelector((state) => state.expenses.expenses);
  const currentMonth = useSelector((state) => state.expenses.userMonth);

  const monthExpenses = expensesData.filter((item) => {
    const itemMonth = new Date(item.data.date).getMonth();

    if (currentMonth === itemMonth) {
      return item;
    }
  });

  // Getting amount of expenses per month and year
  const monthExpensesQuantity = monthExpenses.reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + Number(currentValue.data.amount);
  },
    0);

  const yearExpensesQuantity = expensesData.reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + Number(currentValue.data.amount);
  },
    0);

  return (
    <Chart
      title="Expenses Overview"
      yearAmount={yearExpensesQuantity}
      monthAmount={monthExpensesQuantity}
      currentMonth={displayMonth(currentMonth)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthExpenses.map((item) => ({
            amount: Number(item.data.amount),
            title: item.data.title,
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#4EDF62" />
        </BarChart>
      </ResponsiveContainer>
    </Chart>

  );
};

export default ExpensesChart;
