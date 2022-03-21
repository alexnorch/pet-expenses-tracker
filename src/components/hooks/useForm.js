import { useState } from "react";

const useForm = (initialState) => {
  const [userValue, setUserValue] = useState(initialState);
  const [hasErrors, setHasErrors] = useState(initialState)

  const validateValues = () => {
      const errors = {}

      if (!userValue.title) {
        errors.title = 'Title is required!'
      } else if (userValue.title.length < 5) {
        errors.title = 'Must contain more then 6 characters'
      }
  
      if (!userValue.date ) {
          errors.date = 'Date is required'
      } 

      if (!userValue.amount) {
          errors.amount = 'Amount is required'
      } else if (userValue.amount < 0) {
          errors.amount = 'Must be greater then 0'
      }

      if (!userValue.category) {
          errors.category = 'Category is required'
      }
      
      if (Object.keys(errors).length == 0) {
        return true
      } else {
        return setHasErrors(errors)
      }
  }

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setUserValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  return {
      userValue,
      inputHandler,
      hasErrors,
      validateValues
  }
};


export default useForm;