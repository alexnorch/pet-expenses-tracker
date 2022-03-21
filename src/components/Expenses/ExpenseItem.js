import { useState } from "react";

import { db } from "../../util/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

// Mui material
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

//Muy components
import Modal from "../ui/Modal";
import EditExpense from "./EditExpense";

const ExpenseItem = ({ title, date, amount, category, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const elemId = isOpen ? "action-popover" : undefined;

  const showEditPanel = () => {
    setIsEditing(true)
    handleClose()
  }

  const showDeletePanel = () => {
    setIsDeleting(true)
    handleClose()
  }

  const deleteExpenseHandler = async () => {
    const expensesDocRef = doc(db, "expenses", id);

    try {
      await deleteDoc(expensesDocRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <tr className="expense-item">
      <td>{title}</td>
      <td>{category}</td>
      <td>{amount}$</td>
      <td>{date}</td>
      <td className="expense-actions">
        <Button
          aria-describedby={elemId}
          variant="outlined"
          onClick={handleClick}
        >
          Actions
        </Button>
        <Popover
          id={elemId}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="btn-container">
            <button
              onClick={showEditPanel}
              className="btn-action edit"
            >
              Edit
            </button>
            <button
              onClick={showDeletePanel}
              className="btn-action delete"
            >
              Delete
            </button>
          </div>
        </Popover>
      </td>
    </tr>
    <Modal
      title="Edit expense"
      isShowing={isEditing}
      toggle={() => setIsEditing(false)}>
        <EditExpense 
          title={title}
          category={category}
          amount={amount}
          date={date}
          id={id}
          onCloseModal={() => setIsEditing(false)}/>
    </Modal>
    <Modal
      title="Delete expense"
      isShowing={isDeleting}
      toggle={() => setIsDeleting(false)}>
        <h4>Are you sure you want to delete this item?</h4>
        <div className="button-group">
        <Button
          onClick={deleteExpenseHandler}
          style={{
            background: "#D64444",
            color: "#fff",
            marginRight: '10px'
          }}
          type="submit"
          variant="contained"
        >
          Delete
        </Button>
        <Button
          onClick={() => setIsDeleting(false)} 
          variant="contained">Close</Button>
        </div>
    </Modal>
    </>
  );
};

export default ExpenseItem;
