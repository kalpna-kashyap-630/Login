import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../../toast";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/authSlice";

function Login() {
  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  });



  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loginData : ", loginData);
    // alert("Login Successful!");
    const { email, password } = loginData;
    if (!email || !password) {
      return handleError('email and password are required');
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      const { success, message, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);

        //save to redux - 
        dispatch(
          setCredentials({
            token: jwtToken,
            user: { name, email },
          })
        );
        setTimeout(() => {
          navigate('/home')
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
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              autoFocus
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="mt-4">
            Does't have an account ?
            <Link to="/signup">Sign Up Now</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}


export default Login;