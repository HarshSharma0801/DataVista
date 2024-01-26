import { useNavigate } from "react-router";
import Header from "../Display/Header";


const Signout = ()=>{
const navigate = useNavigate();

   const data = JSON.parse(localStorage.getItem("CellUserinfo"));
   
   const info = data.info;

const click = ()=>{

    localStorage.removeItem("CellUserinfo");
    navigate('/login')
}


return(
    <>
    <Header/>
    <div className="flex flex-col md:py-24 items-center gap-5 justify-center md:text-4xl">
    
     <div className="py-3">
        <p className="py-4">  <span className="text-gray-500">Hi,</span> {info.name}</p> 
        <p>
       <span className="text-gray-500">you are currently signed in as</span>  {info.email}

        </p>
     </div>
     <div>
        <button onClick={click} className="p-4 px-6 text-2xl rounded-full border border-primary hover:text-white hover:bg-primary">
            Sign Out
        </button>
     </div>
    </div>
    </>

)


}

export default Signout