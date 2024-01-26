import React , {useState , useEffect ,useCallback} from "react";
import Layout from "./Row";
import axios from "axios";
const GetUsers = ()=>{

  const [User,SetUsers] = useState([])
const Owner = JSON.parse(localStorage.getItem("CellUserinfo")).info._id;
const getUsers = async()=>{
  try {
   
    const url = "https://dlgil0du4h.execute-api.ap-south-1.amazonaws.com/main"
    await axios.get(url , {
       params:{
        id : Owner
       }
    }).then(res=>{
      if(res){
        console.log(res)
        SetUsers(res.data.Items)
      }
    })
  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{
  getUsers()
},[])

    return(
            <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">

          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm md:text-md font-semibold tracking-wide text-left text-black-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Actions</th>

                </tr>
              </thead>
              <tbody className="bg-white">

                {User &&
                  User.map((data) => (
                   <Layout key={data.id} get={getUsers} title={data.title}  description={data.description} dueDate={data.dueDate} id={data.id} />
                  ))
                }
                 

              </tbody>
            </table>
          </div>
        </div>
      </section>
    )

}

export default GetUsers