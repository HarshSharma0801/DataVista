import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = (props) => {
  const navigate = useNavigate();
  const Owner = JSON.parse(localStorage.getItem("CellUserinfo")).info._id;

  const DeleteTask = async () => {

    
    try {
      axios
        .delete(
          "https://dlgil0du4h.execute-api.ap-south-1.amazonaws.com/main",
          {
            owner: Owner,
            id:props.id
          }
        )
        .then((res) => {
          props.getUsers();
          setisDelete(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [isDelete, setisDelete] = useState(false);

  return (
    <>
      <tr className="text-gray-700">
        <td className="px-4 py-3 border">
          <div className="flex items-center text-sm md:text-md">
            <div>
              <p className="font-semibold text-black">{props.title}</p>
            </div>
          </div>
        </td>

        <td className="px-4 py-3  text-sm md:text-md font-semibold border text-gray-600">
          <textarea
            id="description"
            value={props.description}
            rows="4"
            className="block p-2.5 w-full  text-gray-900 bg-gray-50 rounded-lg border outline-none border-gray-300   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 pointer-events-auto md:pointer-events-none"
          />
        </td>

        <td className="px-4 py-3 text-sm border">{props.dueDate}</td>

        <td className="px-4 py-3 items-center p-4  text-sm border">
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate(`/update/${props.id}`);
              }}
              className="text-blue-500 border-blue-500  border hover:text-white rounded-md px-4 py-2 hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setisDelete(true);
              }}
              className=" text-red-500 border-red-500 border hover:text-white rounded-md px-4 py-2 hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      <div
        className={`${
          isDelete ? "fixed" : "hidden"
        } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
      >
        <div
          className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
        >
          <div
            onClick={() => {
              setisDelete(false);
            }}
            className="ml-[200px] md:ml-[400px] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="pb-[10px]">
            <h1 className="m-0 font-bold md:text-2xl">
              you really want to Delete ?
            </h1>
          </div>
          <div>
            <button
              onClick={DeleteTask}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
