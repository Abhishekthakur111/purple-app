import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2023 <Link to="/dashboard" target="_blank" rel="noopener noreferrer">React</Link>. All rights reserved.
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
