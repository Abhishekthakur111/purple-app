import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="row flex-grow-1">
        {isSidebarOpen && (
          <div className="col-2" style={{ paddingTop: '90px', flex: '0 0 auto' }}>
            <Sidebar /> 
          </div>
        )}
        <div className={isSidebarOpen ? "col-10" : "col-12"} style={{ paddingTop: '20px', flex: '1 0 auto' }}>
          <div className="wrapper"> 
            <div className="content-wrapper">
              <Outlet /> 
            </div>
          </div>
          <Footer /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
