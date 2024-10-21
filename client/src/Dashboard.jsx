import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './Config';
import ApexChart from './ApexChart';

const Dashboard = () => {
  const [users, setUsers] = useState(0);
  const [data, setData] = useState();
  const [subdata, setSubdata] = useState();
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token missing');
        navigate('/login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.body.userCount);
        setData(response.data.body.data);
        setSubdata(response.data.body.subdata);
      } else {
        toast.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the dashboard data');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-home"></i>
            </span>
            Dashboard
          </h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white" style={{ height: '150px' }}>
              <Link to="/users" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                  <h4 className="font-weight-normal mb-3">
                    Users <i className="mdi mdi-chart-line mdi-24px float-end"></i>
                  </h4>
                  <h2 className="mb-5">{users}</h2>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white" style={{ height: '150px' }}>
              <Link to="/category" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                  <h4 className="font-weight-normal mb-3">
                    Categories <i className="mdi mdi-bookmark-outline mdi-24px float-end"></i>
                  </h4>
                  <h2 className="mb-5">{data}</h2>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white" style={{ height: '150px' }}>
              <Link to="/subcategory" style={{ textDecoration: 'none' }}>
                <div className="card-body">
                  <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                  <h4 className="font-weight-normal mb-3">
                    Sub-Categories <i className="mdi mdi-diamond mdi-24px float-end"></i>
                  </h4>
                  <h2 className="mb-5">{subdata}</h2>
                </div>
              </Link>
            </div>
          </div>
         
        </div>
        <div className="">
          <ApexChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
