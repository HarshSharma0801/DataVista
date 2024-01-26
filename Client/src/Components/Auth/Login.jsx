import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [LoginDetails, SetLoginDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [err, Seterr] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetLoginDetails({
      ...LoginDetails,
      [name]: value,
    });
  };

  const LoginApi = async (data) => {
    await axios.post("/login", data).then((res) => {
      if (res.data.valid) {
        localStorage.setItem("CellUserinfo", JSON.stringify(res.data));
        navigate("/");
      } else {
        Seterr(true);
      }
    });
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    LoginApi(LoginDetails);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-primary">
        <div className="flex justify-center">
        <h2 className="text-3xl font-extrabold text-center text-white">
              DataVista
            </h2>
        </div>
        <div className="">

        </div>
        <div className="max-w-md w-[90%] p-6 space-y-8 bg-gray-300  rounded-md">
        
          <div>
          
            <h2 className="text-2xl font-extrabold text-center text-primary">
              Log in to your account
            </h2>
            {err && 
              <h1 className="text-[16px] md:text-xl pt-3 font-extrabold text-center text-red-500">
                Enter Correct Credentials !!
              </h1>
            }
          </div>
          <form className="space-y-6" onSubmit={LoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-primary"
              >
                Email
              </label>
              <input
                onChange={HandleChange}
                id="email"
                type="email"
                required
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
                onChange={HandleChange}
                autoComplete="current-password"
                required
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
                Login
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="w-full flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-primary active:shadow-lg   rounded-md shadow-sm text-lg font-medium text-black hover:text-white bg-white border-[3px] border-primary hover:bg-primary focus:shadow-lg focus:outline-none  "
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
