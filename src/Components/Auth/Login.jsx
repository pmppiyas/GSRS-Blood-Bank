import React, { useContext, useState } from "react";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login.svg";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const notify = () =>
    toast.success("Login Successfull!", {
      autoClose: 3000,
      style: { background: "green", color: "white" },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    let newErrors = {};

    // Validation for email
    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    // Validation for password
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }

    loginUser(email, password).then((result) => {
      notify();
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      notify();

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        number: result.user.phoneNumber || "",
        role: "member",
      };

      const response = await axiosSecure.post("/user", newUser);
      if (response.data) {
        navigate("/login");
      }

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.", {
        autoClose: 3000,
        style: { background: "red", color: "white" },
      });
    }
  };

  return (
    <section className="md:w-3/4 mx-auto  ">
      {/* title */}
      <div className="w-full flex flex-col items-center justify-center  ">
        <h1 className="text-[2.5rem] mt-2 font-bold text-primary leading-[36px] shadow-md">
          Login Here
        </h1>
      </div>

      {/* form area */}
      <div className="grid md:grid-cols-2 gap-x-20 justify-center">
        <div className="h-[300px] md:h-auto">
          <img className="h-full w-full" src={login}></img>
        </div>
        <div>
          {/* form area */}
          <form
            onSubmit={handleSubmit}
            className="w-full mt-[50px] flex flex-col "
          >
            <div className="flex flex-col items-center gap-[20px] justify-center">
              <div className="flex flex-col shadow-lg gap-[5px] w-full ">
                <div className=" relative">
                  <RiAccountCircleLine className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="email"
                    name="email"
                    id="text"
                    placeholder="Email"
                    className="peer  rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="flex flex-col  gap-[5px] w-full shadow-lg">
                <div className="w-[80%] relative">
                  <RiLockPasswordLine className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="peer  rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-primary text-white w-full mt-8"
            >
              {" "}
              Login
            </button>
          </form>
          <div className="flex flex-col justify-center items-center space-y-4 mt-6 pb-10">
            <p>
              Have No Account?{" "}
              <span className="link text-blue-500">
                <Link to="/register">Register</Link>
              </span>
            </p>
            <button
              onClick={() => handleGoogleLogin()}
              className="bg-[#3B9DF8] text-white rounded-md py-1 pl-1 pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200 w-max"
            >
              <div className="py-2 px-2.5 rounded-l-md bg-white">
                <img
                  src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                  alt="google logo"
                  className="w-[23px]"
                />
              </div>
              Sign in with Google
            </button>

            {/* facebook button */}
            <button className="bg-[#1777f2] text-white rounded-md py-[11px] px-[10px] flex items-center gap-[10px] text-[1rem] ">
              <img
                src="https://i.ibb.co/GP1q2C7/download-12-removebg-preview.png"
                alt="Facebook logo"
                className="w-[25px]"
              />
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
