import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [err, Seterr] = useState(false);
  const [UserData, SetUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetUserData({
      ...UserData,
      [name]: value,
    });
  };

  const SignInApi = async (data) => {
    await axios.post("/signup", data).then((res) => {
      if (res.data.valid) {
        localStorage.setItem("CellUserinfo", JSON.stringify(res.data));
        navigate('/');
        
      } else {
        Seterr(true);
      }
    });
  };

  const UserSubmit = (e) => {
    e.preventDefault();
    SignInApi(UserData);
    SetUserData({
        name: "",
        email: "",
        password: "",
      })
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-primary">
      <div className="flex justify-center">
        <h2 className="text-3xl font-extrabold text-center text-white">
              DataVista
            </h2>
        </div>
        <div className="max-w-md w-[90%] p-6 space-y-8 bg-gray-300  rounded-md">
          
          <div>
            <h2 className="text-2xl font-extrabold text-center text-primary">
              Create your account
            </h2>
            {err && (
              <h1 className="text-[16px] md:text-xl pt-3 font-extrabold text-center text-red-500">
                User Already Found !!
              </h1>
            )}
          </div>
          <form className="space-y-6" onSubmit={UserSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-primary"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                name="name"
                value={UserData.name}
                onChange={HandleChange}
                placeholder="Name"
                className="mt-1 p-2 w-full border border-primary rounded-md outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-primary"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={UserData.email}

                onChange={HandleChange}
                name="email"
                placeholder="Email"
                className="mt-1 p-2 w-full border border-primary rounded-md outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-primary"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={UserData.password}

                onChange={HandleChange}
                name="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border border-primary rounded-md outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-primary active:shadow-lg border border-primary rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary focus:shadow-lg focus:outline-none "
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
