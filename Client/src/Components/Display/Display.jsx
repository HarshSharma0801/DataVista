import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "./Header";
import GetUsers from "../GetTasks/GetTasks";
const Display = () => {

  const navigate = useNavigate();
  const [isData, setisData] = useState(false);
  const [Person, SetPerson] = useState();
  useEffect(() => {
    const getUser = () => {
      const data =   JSON.parse(localStorage.getItem("CellUserinfo"));
      if (data) {
        const token = data.access;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const config = {
          headers: headers,
        };

        axios.get("/Token", config).then((res) => {
          if (res.data.valid) {
            SetPerson(res.data.Userdata);
            setisData(true);
          } else {
            navigate('/login')
          }
        });
      } else {
        navigate('/login');
      }
    };

    getUser();
  }, []);
  return (
    <>
    <Header/>
    {isData && <GetUsers/>}
    </>
  );
};

export default Display;
