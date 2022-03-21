import { useEffect } from "react";
import { uploadData } from "../store/savingsSlice";
import { useDispatch, useSelector } from "react-redux"
import { collection, onSnapshot, query} from 'firebase/firestore'
import { db } from "../../util/firebase-config";

import NewSaving from "./NewSaving";
import SavingItem from "./SavingItem";

const Savings = () => {
    const dispatch = useDispatch()
    const savingsCollection = collection(db, 'savings')
    const savingsData = useSelector(state => state.savingsData.savings)

    useEffect(() => {
        const getSavings = async () => {
            const q = query(savingsCollection)
            onSnapshot(q, (querySnapshot) => {
                dispatch(uploadData(querySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))))
            })
        }
        getSavings()
    }, [])

    return (
        <div className="savings">
            {savingsData.map((item) => <SavingItem key={item.id} savingData={item}/>)}
            <NewSaving />
        </div>
    )
}

export default Savings;