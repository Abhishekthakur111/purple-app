import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Config';

const CategoryView = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/viewcategory/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
        } else {
          setError("Failed to fetch category data.");
        }
      } catch (err) {
        setError("Error fetching category data.");
        console.error("Error fetching category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                    <i className="mdi mdi-grid"></i>
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
                            src={`${BASE_URL}${data.image}`}
                            alt="User"
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
                            value={data.name || ""}
                            readOnly
                          />
                        </div>
                        <button
                          className="btn btn-gradient-primary me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/category");
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

export default CategoryView;
