import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";

// Mui material
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Mui Icons
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';

const ExpensesTable = () => {
  const filteredData = useSelector(state => state.expenses.filteredExpenses)
  
  return (
    <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <CreditCardIcon />
            <Typography component='p' variant='body1'>Title</Typography>
          </TableCell>
          <TableCell>
            <BookmarksIcon />
            <Typography component='p' variant='body1'>Category</Typography>
          </TableCell>
          <TableCell>
            <AttachMoneyIcon />
            <Typography component='p' variant='body1'>Amount</Typography>
          </TableCell>
          <TableCell>
            <DateRangeIcon />
            <Typography component='p' variant='body1'>Date</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
      </TableBody>
    </Table>
    {filteredData.length === 0 && <div className="text-center"><p className="table-message">There is no expenses</p></div>}
    </>
  );
};

export default ExpensesTable;
