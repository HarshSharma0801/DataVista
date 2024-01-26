import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isData, setisData] = useState();
  const [Person, SetPerson] = useState();
  useEffect(() => {
    const getUser = () => {
      const data = JSON.parse(localStorage.getItem("CellUserinfo"));
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
            setisData(false);
          }
        });
      } else {
        setisData(false);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-primary p-4 ">
        <div>
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="md:text-3xl text-xl flex gap-2 cursor-pointer"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-9 md:h-9 w-5 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
            </div>
            <div className="font-bold">DataVista</div>
          </h1>
        </div>
        <div className="flex gap-1 justify-center md:hidden">
          <div className="flex  justify-center rounded-xl p-1 bg-white ">
            <input
              type="text"
              //   onChange={Search}
              className="text-black text-sm rounded-2xl p-1 w-[35vw] outline-none  font-semibold "
              placeholder="search by name "
            />
            <div className="text-center flex justify-center items-center ">
              <button
                // onClick={() => {
                //   SearchQuery(SearchValue);
                // }}
                className="p-1 rounded-full border border-secondary hover:bg-primary hover:text-white text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <svg
              onClick={() => {
                isData ? navigate("/account") : navigate("/login");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-9 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        <div className="hidden md:flex  justify-center rounded-2xl bg-white ">
          <input
            type="text"
            // onChange={Search}
            className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
            placeholder="search by name "
          />
          <div className="text-center flex justify-center items-center p-2">
            <button
              //   onClick={() => {
              //     SearchQuery(SearchValue);
              //   }}
              className="p-1 rounded-full border border-primary hover:bg-primary hover:text-white text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className=" hidden md:flex gap-4 p-2 items-center text-center justify-center">
   <div>
   <button
                onClick={() => {
                  navigate("/create");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-primary hover:text-white hover:bg-primary"
              >
                Create Task
              </button>
   </div>
          <div>
            {isData ? (
              <button
                onClick={() => {
                  navigate("/account");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-primary hover:text-white hover:bg-primary"
              >
                Hi, {Person && Person.name}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="p-3 font-bold px-6 rounded-full  border-2 border-white  bg-white text-primary hover:text-white hover:bg-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
