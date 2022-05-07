import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Expenses from "./components/Expenses/Expenses";
import Savings from "./components/Savings/Savings";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Expenses />}/>
        <Route path='/expenses' element={<Expenses />}/>
        <Route path='/savings' element={<Savings />}/>
      </Routes>
    </Layout>
  )
}

export default App;