import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@mdi/font/css/materialdesignicons.min.css';


const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    
    const path = location.pathname.split('/')[1]; 
    setActiveItem(path); 
  }, [location]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
            <Link 
              to="/dashboard" 
              className="nav-link" 
              onClick={() => handleItemClick('dashboard')}
            >
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'users' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/users" 
              onClick={() => handleItemClick('users')}
            >
              <span className="menu-title">Users</span>
              <i className="mdi mdi-account menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'category' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/category" 
              onClick={() => handleItemClick('category')}
            >
              <span className="menu-title">Categories</span>
              <i className="mdi mdi-grid menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'subcategory' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/subcategory" 
              onClick={() => handleItemClick('subcategory')}
            >
              <span className="menu-title">Sub Categories</span>
              <i className="mdi mdi-menu menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'privacypolicy' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/privacypolicy" 
              onClick={() => handleItemClick('privacypolicy')}
            >
              <span className="menu-title">Privacy Policy</span>
              <i className="mdi mdi-file-document menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'aboutus' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/aboutus" 
              onClick={() => handleItemClick('aboutus')}
            >
              <span className="menu-title">About Us</span>
              <i className="mdi mdi-information menu-icon"></i>
            </Link>
          </li>
          <li className={`nav-item ${activeItem === 'terms' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              data-bs-toggle="collapse" 
              to="/terms" 
              onClick={() => handleItemClick('terms')}
            >
              <span className="menu-title">Terms&Conditions</span>
              <i className="mdi mdi-clipboard-text menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .nav-item.active .nav-link {
          // background-color: #da8cff; 
          color: white; 
          font-weight: bold; /* Make the text bold */
        }
        .sidebar .nav .nav-item.active {
          // background: #da8cff;
        }
        .sidebar .nav .nav-item.active .nav-link {
          background: white; 
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
