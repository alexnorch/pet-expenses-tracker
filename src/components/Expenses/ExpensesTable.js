import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";

const ExpensesTable = () => {
  const filteredData = useSelector(state => state.expenses.filteredExpenses)
  
  return (
    <>
    <table className="expenses-table">
      <thead>
        <tr>
          <th>
            <i className="far fa-credit-card" />
            <span className="table-header__text">Title</span>
          </th>
          <th>
            <i className="fas fa-tags" />
            <span className="table-header__text">Category</span>
          </th>
          <th>
            <i className="fas fa-coins" />
            <span className="table-header__text">Amount</span>
          </th>
          <th>
            <i className="far fa-calendar-alt" />
            <span className="table-header__text">Date</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <ExpenseItem
            id={item.id}
            key={item.id}
            title={item.data.title}
            date={item.data.date}
            amount={`${+item.data.amount}`}
            category={item.data.category}
          />
        ))}
      </tbody>
    </table>
    {filteredData.length === 0 && <div className="text-center"><p className="table-message">There is no expenses</p></div>}
    </>
  );
};

export default ExpensesTable;
