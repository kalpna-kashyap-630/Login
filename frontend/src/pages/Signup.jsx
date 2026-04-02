import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../../toast";
import { validateSignup } from "./validation";

function Signup(){
     const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
      });
      
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
      const handleChange = (e) => {
        const {name,value} = e.target;
        console.log(name,value);
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData : ",formData);
        // alert("Login Successful!");
        // const {name, number, email, password, confirm_password} = formData;
        // if(!name ||!number || !email || !password ||!confirm_password){
        //   return handleError('name, number,email,password, confirm password are required');
        // }
         const validationErrors = validateSignup(formData);
         setErrors(validationErrors);

         if (Object.keys(validationErrors).length > 0) {
         return; // Stop submit if errors exist
       }

        try {
          const url = "http://localhost:8080/auth/signup";
          const response = await fetch(url, {
           method: "POST",
           headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
          const result = await response.json();
          const {success, message} = result;
          if(success){
            handleSuccess(message);
            setTimeout(()=>{
              navigate('/login')
            }, 1000)
          } 
          else {
            handleError(message);
          }
            console.log(result);
        } catch (err) {
          handleError(err.message || "Something went wrong");
        }
      };
    return (
           <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Signup</h3>

        <form onSubmit={handleSubmit}>
               <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="name"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
              placeholder="Enter Name"
              required
            />
          </div>
             <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              name="number"
              value={formData.number}
              onChange={handleChange}
              autoFocus
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoFocus
              placeholder="Enter password"
              required
            />
          </div>
             <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
              autoFocus
              placeholder="Confirm password"
              required
            />
              {errors.confirm_password && (
             <div className="invalid-feedback">
             {errors.confirm_password}
             </div>
             )}
          </div>


          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
          
          <p className="mt-4">
            Already have been an account ?  
            <Link to = "/login">Login</Link>
            </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
    

export default Signup;