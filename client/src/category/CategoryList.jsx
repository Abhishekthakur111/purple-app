import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Config";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categorylist`);
      if (response.data.success) {
        setCategories(response.data.body.data);
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to load categories",
          "error"
        );
      }
    } catch (error) {
      console.error("Error fetching category list", error);
      Swal.fire(
        "Error",
        "An error occurred while fetching the category list",
        "error"
      );
    }
  };

  const deleteCategory = async (_id) => {
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
        await axios.delete(`${BASE_URL}/delete_category/${_id}`);
        fetchData();
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Error deleting category",
          "error"
        );
      }
    } else {
      Swal.fire("Cancelled", "Category deletion has been cancelled", "info");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "0" ? "1" : "0";

    try {
      const response = await axios.post(`${BASE_URL}/categorystatus`, {
        id,
        status: newStatus,
      });

      if (response.data.success) {
        fetchData();
        toast.success(
          `Category status changed to ${
            newStatus === "0" ? "Active" : "Inactive"
          }`
        );
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      toast.error("An error occurred while changing category status");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="container-scroller">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-grid"></i>
              </span>
              Categories
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                      style={{ marginRight: "10px" }} 
                    />
                    <Link
                      to="/addcategory"
                      className="btn btn-gradient-primary"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <i
                        className="fas fa-plus"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Add
                    </Link>
                  </div>

                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th>Sr_No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category, index) => (
                        <tr key={category._id}>
                          <td>{index + 1}</td>
                          <td>
                            {category.image ? (
                              <img
                                src={`${BASE_URL}/${encodeURIComponent(
                                  category.image
                                )}`}
                                alt={category.name}
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
                          <td>{category.name}</td>
                          <td>
                            <div className="form-switch d-flex align-items-center justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`toggleStatus${category._id}`}
                                checked={category.status === "0"}
                                onChange={() =>
                                  toggleStatus(category._id, category.status)
                                }
                                style={{
                                  backgroundColor:
                                    category.status === "0"
                                      ? "#da8cff"
                                      : "lightgray",
                                  borderColor:
                                    category.status === "0"
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
                              to={`/viewcategory/${category._id}`}
                              className="btn btn-gradient-primary me-2"
                              title="View Category"
                            >
                              <i className="fas fa-eye" />
                            </Link>
                            <button
                              onClick={() => deleteCategory(category._id)}
                              className="btn btn-gradient-danger"
                              title="Delete Category"
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

export default CategoryList;
