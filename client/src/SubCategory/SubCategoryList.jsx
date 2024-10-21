import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Config';

const SubCategoryList = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/services`);
      if (response.data.success) {
        setServices(response.data.body.data);
      } else {
        Swal.fire("Error", response.data.message || "Failed to load subcategory", "error");
      }
    } catch (error) {
      console.error("Error fetching subcategory list", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred while fetching the Sub Category list", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "0" ? "1" : "0";

    try {
      const response = await axios.post(`${BASE_URL}/status`, {
        id,
        status: newStatus,
      });

      if (response.data.success) {
        fetchData();
        toast.success(`Sub Category status changed to ${newStatus === "0" ? "Active" : "Inactive"}`);
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      toast.error("An error occurred while changing status");
    }
  };

  const deleteService = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/delete_service/${_id}`);
        fetchData();
        Swal.fire("Deleted!", "Sub Category has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message || "Error deleting Sub Category", "error");
      }
    } else {
      Swal.fire("Cancelled", "Sub Category deletion has been cancelled", "info");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="container-scroller">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-view-list"></i>
              </span>
              Sub Categories
            </h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="col-3 d-flex align-items-center mb-3">
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="form-control"
                      style={{ marginRight: "10px" }}
                    />
                    <Link to="/addsubcategory" className="btn btn-gradient-primary" style={{ display: "flex", alignItems: "center" }}>
                      <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>
                      Add
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th>Sr_No.</th>
                          <th>Category Name</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.length ? (
                          filteredServices.map((service, index) => (
                            <tr key={service._id}>
                              <td>{index + 1}</td>
                              <td>{service.cat_id?.name || "Unknown"}</td>
                              <td>{service.name}</td>
                              <td>${service.price}</td>
                              <td>
                                {service.image ? (
                                  <img
                                    src={`${BASE_URL}/${service.image}`}
                                    alt={service.name}
                                    onError={(e) => (e.target.src = "path/to/default/image.jpg")}
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
                              <td>
                            <div className="form-switch d-flex align-items-center justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`toggleStatus${service._id}`}
                                checked={service.status === "0"}
                                onChange={() =>
                                  toggleStatus(service._id, service.status)
                                }
                                style={{
                                  backgroundColor:
                                    service.status === "0"
                                      ? "#da8cff"
                                      : "lightgray",
                                  borderColor:
                                    service.status === "0"
                                      ? "#da8cff"
                                      : "lightgray",
                                  width: "50px",
                                  height: "30px",
                                }}
                              />
                            </div>
                          </td>
                              <td>
                              <Link
                              to={`/service/${service._id}`}
                              className="btn btn-gradient-primary me-2"
                              title="View SubCategory"
                            >
                              <i className="fas fa-eye" />
                            </Link>
                            <button
                              onClick={() => deleteService(service._id)}
                              className="btn btn-gradient-danger"
                              title="Delete SubCategory"
                            >
                              <i className="fas fa-trash" />
                            </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">No services found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default SubCategoryList;
