import { useEffect } from "react";
import { updateData } from "../store/expensesSlice";
import { useDispatch } from "react-redux"
import { collection, onSnapshot, query} from 'firebase/firestore'
import { db } from "../../util/firebase-config";

// All components
import ExpensesChart from "./ExpensesChart";
import ExpensesNavigation from "./ExpensesNavigation";
import ExpensesTable from "./ExpensesTable";

const Expenses = () => {
    const dispatch = useDispatch()
    const expensesCollection = collection(db, 'expenses')

    useEffect(() => {
        const getExpenses = async () => {
            const q = query(expensesCollection)
            onSnapshot(q, (querySnapshot) => {
                dispatch(updateData(querySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))))
            })
        }
        getExpenses()
    }, [])

    return (
        <>
            <ExpensesChart />
            <ExpensesNavigation />
            <ExpensesTable />
        </>
    )
}

export default Expenses;