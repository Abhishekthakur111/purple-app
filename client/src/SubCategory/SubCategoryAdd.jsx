import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Config';
import { toast } from 'react-toastify';

const SubCategoryAdd = () => {
  const [data, setData] = useState({
    cat_id: '',
    name: '',
    price: '',
    image: null,
  });
  const [categories, setCategories] = useState([]); 
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categorylist`);
      console.log("Category fetch response:", response.data); 
      if (response.data.success) {
        setCategories(response.data.body.data);
      } else {
        toast.error(`Failed to fetch categories: ${response.data.message}`);
      } 
    } catch (error) {
      console.error("Error fetching category list", error);
      toast.error("Error fetching category list. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'image' && files.length > 0) {
      setData((prevData) => ({
        ...prevData,
        [id]: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0])); 
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cat_id', data.cat_id); 
    formData.append('name', data.name);
    formData.append('price', data.price);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await axios.post(`${BASE_URL}/createservice`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData({
          cat_id: '',
          name: '',
          price: '',
          image: null,
        });
        setImagePreview(null);
        toast.success('subcategory added successfully!');
        navigate('/subcategory');
      } else {
        toast.error(`Service creation failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Request failed: ${error.message}`);
    }
  };

  return (
    <div className="container-scroller">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-view-list"></i>
            </span>
            Add Sub-Category
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample" onSubmit={handleSubmit}>
                  <div className="form-group">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Sub Category"
                        style={{
                          marginLeft: '500px',
                          width: '200px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="cat_id">Category</label>
                    <select
                      id="cat_id"
                      className="form-control"
                      required
                      value={data.cat_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No categories available</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="name">Subcategory Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      id="price"
                      value={data.price}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-gradient-primary me-2">
                    Add
                  </button>
                  <button
                    className="btn btn-secondary"
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
  );
};

export default SubCategoryAdd;
