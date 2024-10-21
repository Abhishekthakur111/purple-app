import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { BASE_URL } from '../Config';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/userlist`);

      if (response.data.success) {
        setUsers(response.data.body.data);
      } else {
        Swal.fire("Error", response.data.message || "Failed to load users", "error");
      }
    } catch (error) {
      console.error("Error fetching user list", error);
      Swal.fire("Error", "An error occurred while fetching the user list", "error");
    }
  };

  const deleteUser = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da8cff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/userdelete/${_id}`);
        fetchData(); 
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Error deleting user",
          "error"
        );
      }
    } else {
      Swal.fire("Cancelled", "User deletion has been cancelled", "info");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "0" ? "1" : "0";

    try {
      const response = await axios.post(`${BASE_URL}/userstatus`, { id, status: newStatus });

      if (response.data.success) {
        fetchData();
        toast.success(`User status changed to ${newStatus === "0" ? "Active" : "Inactive"}`);
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      toast.error("An error occurred while changing user status");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="content-wrapper">
          <div className="page-header">
          <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account"></i>
          </span>
          Users
        </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb"></ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                 <div className='col-2' >
                     <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="form-control mb-3" 
                  /></div>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th>Sr_No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone No</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            {user.image ? (
                              <img
                                src={`${BASE_URL}/${encodeURIComponent(user.image)}`}
                                alt={user.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>{user.phone_no}</td>
                          <td>
                            <div className="form-switch d-flex align-items-center justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`toggleStatus${user._id}`}
                                checked={user.status === "0"}
                                onChange={() => toggleStatus(user._id, user.status)}
                                style={{
                                  backgroundColor: user.status === "0" ? "#da8cff" : "lightgray",
                                  borderColor: user.status === "0" ? "#da8cff" : "lightgray",
                                  width: '50px',
                                  height: '30px',
                                }}
                              />
                            </div>
                          </td>
                          <td> 
                            <Link
                              to={`/viewuser/${user._id}`}
                              className="btn btn-gradient-primary me-2"
                              title="View User"
                            >
                              <i className="fas fa-eye" />
                            </Link>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="btn btn-gradient-danger"
                              title="Delete User"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
