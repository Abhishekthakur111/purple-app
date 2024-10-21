import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { BASE_URL } from '../Config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css'; 

const PrivacyPolicy = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/privacy`);
        const { data } = response.data;
        setTitle(data.title || "");
        setContent(data.content || "<p><br></p>");
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.trim() === "<p><br></p>") {
      setError("Privacy Policy cannot be empty.");
      return;
    }

    setError("");
    setSubmitError("");

    try {
      await axios.post(`${BASE_URL}/privacypolicy`, {
        title,
        content,
      });
      toast.success("Privacy policy updated successfully");
      navigate("/privacypolicy");
    } catch (error) {
      setSubmitError("Error submitting privacy policy. Please try again.");
      toast.error("Error submitting privacy policy. Please try again.");
      console.error("Error submitting privacy policy:", error);
    }
  };

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

      <div className="container-scroller">
        <div className="">
          <div className="">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="mdi mdi-file-document"></i>
                  </span>
                  Privacy Policy
                </h3>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit} className="p-2">
                        <div className="row mb-2">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                id="title"
                                type="text"
                                className="form-control"
                                value={title}
                                readOnly
                               
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="content">Content</label>
                              <div style={{ position: "relative" }}>
                                <ReactQuill
                                  id="content"
                                  style={{ height: "300px", marginBottom: "50px" }}
                                  theme="snow"
                                  value={content}
                                  onChange={setContent}
                                  modules={{
                                    toolbar: [
                                      [{ header: "1" }, { header: "2" }, { font: [] }],
                                      [{ list: "ordered" }, { list: "bullet" }],
                                      ["bold", "italic", "underline"],
                                      [{ color: [] }, { background: [] }],
                                      [{ align: [] }],
                                      ["clean"],
                                    ],
                                  }}
                                />
                                {content.trim() === "<p><br></p>" && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: 55,
                                      left: 18,
                                      right: 0,
                                      bottom: 0,
                                      pointerEvents: "none",
                                      color: "red",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Privacy Policy cannot be empty.
                                  </div>
                                )}
                              </div>
                              {error && <p className="text-danger">{error}</p>}
                              {submitError && (
                                <p className="text-danger">{submitError}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-gradient-primary " >
                              Update
                            </button>
                          </div>
                        </div>
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

export default PrivacyPolicy;
