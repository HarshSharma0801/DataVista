import Header from "../Display/Header"
import { useNavigate } from "react-router"

const Account = ()=>{

const navigate = useNavigate()

    return (
        <>
        <Header/>
        <div className="p-10">
         <div className="flex md:flex-row flex-col md:gap-8 gap-5">
            <div>
            <button onClick={()=>{
                navigate('/signout')
            }} className="p-4 rounded-full border border-primary hover:bg-primary hover:text-white">Login Info</button>
            </div>
            <div>
            <button onClick={()=>{
                navigate('/create')
            }} className="p-4 rounded-full border border-primary hover:bg-primary hover:text-white">Create Task</button>
            </div>
         </div>
        </div>
        </>
    )


}


export default Account