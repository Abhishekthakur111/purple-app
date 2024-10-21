import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../Config';
import 'react-toastify/dist/ReactToastify.css'; 

const Password = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const reset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/change_password`,
        { password, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.body.token); 
        toast.success("Your password was reset successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Password reset failed");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password: " + (error.response?.data?.message || error.message));
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
      <div>
        <div className="container-scroller">
          <div className="">
            <div className="content-wrapper">
              <div className="page-header">
              <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-lock"></i>
          </span>
          Change Password
        </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                   
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form className="forms-sample" onSubmit={reset}>
                        <div className="form-group">
                          <label htmlFor="currentPassword">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            placeholder="Enter current password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>

                        <button type="submit" className="btn btn-gradient-primary me-2">
                        Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
