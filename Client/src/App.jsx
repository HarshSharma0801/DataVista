import Login from "./Components/Auth/Login"
import SignUp from "./Components/Auth/SignUp"
import Display from "./Components/Display/Display"
import { Route,Routes } from "react-router"
import axios from "axios"
import Account from "./Components/Account/Account"
import Signout from "./Components/Account/LoginInfo"
import CreateTaskForm from "./Components/CreateTask/CreateTask"
import UpdateTaskForm from "./Components/UpdateTask/UpdateTask"
function App() {

 axios.defaults.baseURL = "http://localhost:5000/"

  return (
    <>
 <Routes>
   <Route path="/" element={<Display/>} />
   <Route path="/login" element={<Login/>} />
   <Route path="/signup" element={<SignUp/>} />
   <Route path="/account" element={<Account/>} />
   <Route path="/signout" element={<Signout/>} />
   <Route path="/create" element={<CreateTaskForm/>} />
   <Route path="/update/:id" element={<UpdateTaskForm/>} />


   </Routes>

    </>
  )
}

export default App
