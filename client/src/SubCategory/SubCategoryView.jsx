import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Config';

const SubCategoryView = () => {
  const { _id } = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await axios.get(`${BASE_URL}/service/${_id}`);
        if (response.data.success) {
          setService(response.data.body);
        } else {
          setError("Failed to fetch service data.");
        }
      } catch (err) {
        setError("Error fetching service data.");
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container-scroller">
        <div className="">
          <div className="">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-view-list"></i>
                  </span>
                  Detail
                </h3>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <form className="forms-sample">
                        <div className="form-group">
                          <img
                            src={`${BASE_URL}/${service.image}`}
                            alt="Service"
                            style={{
                              marginLeft: "500px",
                              width: "200px",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={service.name || ""}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label>Category</label>
                          <input
                            type="text"
                            id="category"
                            className="form-control"
                            value={service.cat_id?.name || "Unknown"}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="text"
                            id="price"
                            className="form-control"
                            value={`$${service.price || "N/A"}`}
                            readOnly
                          />
                        </div>
                        <button
                          className="btn btn-gradient-primary me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/subcategory");
                          }}
                        >
                          Back
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

export default SubCategoryView;
