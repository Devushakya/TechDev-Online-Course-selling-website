import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEye ,AiOutlineEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const {password,confirmPassword}= formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

 return (
   <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
     {loading ? (
       <div className="flex flex-row items-center justify-center h-screen   w-full">
         <div className="loader"></div>
       </div>
     ) : (
       <div className="max-w-[500px] p-4 lg:p-8">
         <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
           Choose new password
         </h1>
         <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
           Almost done. Enter your new password and youre all set.
         </p>
         <form onSubmit={submitHandler}>
           <label className="relative">
             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
               New Password <sup className="text-pink-200">*</sup>
             </p>
             <input
               required
               type={showPassword ? "text" : "password"}
               name="password"
               value={password}
               onChange={changeHandler}
               placeholder="Enter Password"
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
             />
             <span
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
             >
               {showPassword ? (
                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
               ) : (
                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
               )}
             </span>
           </label>
           <label className="relative mt-3 block">
             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
               Confirm New Password <sup className="text-pink-200">*</sup>
             </p>
             <input
               required
               type={showConfirmPassword ? "text" : "password"}
               name="confirmPassword"
               value={confirmPassword}
               onChange={changeHandler}
               placeholder="Confirm Password"
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
             />
             <span
               onClick={() => setShowConfirmPassword((prev) => !prev)}
               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
             >
               {showConfirmPassword ? (
                 <AiOutlineEyeInvisible
                   fontSize={24}
                   fill="#AFB2BF"
                   className=" text-richblack-600"
                 />
               ) : (
                 <AiOutlineEye
                   fontSize={24}
                   fill="#AFB2BF"
                   className=" text-richblack-600"
                 />
               )}
             </span>
           </label>

           <button
             type="submit"
             className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
           >
             Reset Password
           </button>
         </form>
         <div className="mt-6 flex items-center justify-between">
           <Link to="/login">
             <p className="flex items-center gap-x-2 text-richblack-5">
               <BiArrowBack /> Back To Login
             </p>
           </Link>
         </div>
       </div>
     )}
   </div>
 );
};

export default UpdatePassword;
