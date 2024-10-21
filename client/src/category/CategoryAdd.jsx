import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { BASE_URL } from '../Config';


const CategoryAdd = () => {
  const [data, setData] = useState({
    name: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/createCategory`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        toast.success('Category added successfully!');
        navigate('/category'); 
      } else {
        toast.error('Category creation failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Request failed: ' + error.message);
    }
  };

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
                  Add Category
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
                              alt="Category"
                              style={{
                                marginLeft: "500px",
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "50%",
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
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={data.name}
                            onChange={handleChange} 
                            required 
                          />
                        </div>
                        <button type="submit" className="btn btn-gradient-primary me-2">
                          Add 
                        </button>
                        <button
                          className="btn btn-secondary"
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
}

export default CategoryAdd;
