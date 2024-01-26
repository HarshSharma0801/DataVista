import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Header from "../Display/Header";
import axios from "axios";
import { useNavigate } from "react-router";
const CreateTaskForm = () => {
  const OwnerData = JSON.parse(localStorage.getItem('CellUserinfo'));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null,
    ownerId : OwnerData.info._id,
    id : Math.floor(Math.random()*100),
  });
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue.endDate);
    setValue(newValue);
    setFormData({
      ...formData,
      dueDate: newValue.endDate,
    });
  };
 
  const CreateTask = async(data)=>{
    try {
      await axios.post("https://dlgil0du4h.execute-api.ap-south-1.amazonaws.com/main" , data).then(res=>{
            if(res.data.valid){
              navigate('/')
            }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateTask(formData);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center md:pt-6 pt-3 items-center">
         <div>
          <h1 className="md:text-3xl text-xl text-primary">Create Task</h1>
         </div>
      </div>
      <form
        className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-;g font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border rounded w-full outline-none py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded w-full outline-none py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700  text-lg font-bold mb-2"
          >
            Date:
          </label>
       <div className="border rounded w-full outline-none px-3">
       <Datepicker
           useRange={false}
            primaryColor={"indigo"}
            minDate={new Date()}
            value={value}
            asSingle={true}
            onChange={handleValueChange}
            separator={"to"}
          />
       </div>
       
        </div>
        <div className="flex justify-center items-center py-3">
        <button
          type="submit"
          className="bg-primary w-full text-white py-2 px-4 rounded-lg hover:bg-primary"
        >
          Create
        </button>
        </div>
      
      </form>
    </>
  );
};

export default CreateTaskForm;
