import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../../assets/register.svg";
import { RiAccountCircleLine, RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import { FiPhone } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const notify = () =>
    toast.success("Registration Successful!", {
      autoClose: 3000,
      style: { background: "green", color: "white" },
    });

  const notifyErr = (message = "Registration Unsuccessful!") =>
    toast.error(message, {
      autoClose: 3000,
      style: { background: "red", color: "white" },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const photo = formData.get("photo");
    const email = formData.get("email");
    const number = formData.get("number");
    const password = formData.get("password");

    const newErrors = validateForm({ name, photo, email, number, password });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUser(email, password);

      // Update user profile with name and photo
      if (updateUserProfile) {
        await updateUserProfile(name, photo);
      }

      // Create user object to send to the backend
      const newUser = {
        name,
        email,
        photoURL: photo,
        number,
        role: "member",
      };

      await axiosSecure.post("/user", newUser);
      notify();
      logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);

      // Provide more specific error messages
      if (error.code === "auth/email-already-in-use") {
        notifyErr("Email is already in use. Please use a different email.");
      } else {
        notifyErr(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = ({ name, photo, email, number, password }) => {
    const errors = {};

    if (!name || name.trim() === "") {
      errors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = "Only letters and spaces allowed.";
    }

    if (!photo || photo.trim() === "") {
      errors.photo = "Photo URL is required.";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photo)) {
      errors.photo = "Enter a valid image URL.";
    }

    if (!email || email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!number || number.trim() === "") {
      errors.number = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(number)) {
      errors.number = "Enter a valid phone number (10-15 digits).";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password =
        "Password must contain at least one uppercase letter and one number.";
    }

    return errors;
  };

  return (
    <section className="md:w-3/4 mx-auto py-8">
      <div className="w-full flex flex-col items-center justify-center mb-6">
        <h1 className="text-[2.5rem] font-bold text-primary leading-[36px] shadow-md mt-2">
          Register Here
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-x-20 justify-center">
        <div className="h-[300px] md:h-auto flex items-center justify-center">
          <img
            className="h-full w-full object-contain"
            src={register}
            alt="Sign up"
          />
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-[50px] flex flex-col"
          >
            <div className="flex flex-col items-center gap-[20px] justify-center">
              <div className="flex flex-col shadow-lg gap-[5px] w-full">
                <div className="relative">
                  <RiAccountCircleLine className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Username"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col shadow-lg gap-[5px] w-full">
                <div className="relative">
                  <MdOutlineMail className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="text"
                    name="photo"
                    id="photo"
                    placeholder="Photo URL"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-sm">{errors.photo}</p>
                )}
              </div>

              <div className="flex flex-col shadow-lg gap-[5px] w-full">
                <div className="relative">
                  <MdOutlineMail className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col shadow-lg gap-[5px] w-full">
                <div className="relative">
                  <FiPhone className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="tel"
                    name="number"
                    id="number"
                    placeholder="Phone Number"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.number && (
                  <p className="text-red-500 text-sm">{errors.number}</p>
                )}
              </div>

              <div className="flex flex-col gap-[5px] w-full shadow-lg">
                <div className="relative w-full">
                  <RiLockPasswordLine className="absolute top-3.5 left-3 text-[1.5rem] text-[#777777]" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`btn bg-primary text-white w-full mt-8 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="flex flex-col justify-center items-center space-y-4 mt-6 pb-10">
            <p>
              Already Have an Account?{" "}
              <span className="link text-blue-500">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
