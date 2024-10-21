import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BASE_URL } from './Config';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        if (response.data.success) {
          localStorage.setItem('token', response.data.body.token);
          toast.success("Admin logged in successfully");
          navigate('/dashboard', { state: { message: 'Admin logged in successfully' } });
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        toast.error('An error occurred while logging in. Please try again');
      }
    } else {
      toast.error('Please fix the validation errors before submitting');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.svg" alt="logo" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        value={email}
                        onChange={handleChangeEmail}
                      />
                      {emailError && <small className="text-danger">{emailError}</small>}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={handleChangePassword}
                      />
                      {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>
                    <div className="mt-3 d-grid gap-2">
                      <button
                        type="submit" 
                        className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN IN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
