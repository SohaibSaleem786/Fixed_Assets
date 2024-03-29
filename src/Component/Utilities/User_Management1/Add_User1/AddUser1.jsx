import Header from "../../../MainComponent/Header/Header";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../../MainComponent/Footer/Footer";

function AddUser1() {
  const { primaryColor } = useTheme();
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor } = useTheme();

  const [values, setValues] = useState({
    FUsrIdd: "",
    FUsrNamm: "",
    FUsrPwdd: "",
    FUsrStss: "",
    FUsrTypp: "",
    FMobNumm: "",
    FEmlAddd: "",
    loading: false,
  });

  const [alert, setAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("FUsrId", values.FUsrIdd);
      formData.append("FUsrNam", values.FUsrNamm);
      formData.append("FUsrPwd", values.FUsrPwdd);
      formData.append("FUsrSts", values.FUsrStss);
      formData.append("FUsrTyp", values.FUsrTypp);
      formData.append("FMobNum", values.FMobNumm);
      formData.append("FEmlAdd", values.FEmlAddd);

      // Use the correct Content-Type header
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios
        .post(
          "https://crystalsolutions.com.pk/malikspicy/AddUser.php",
          formData,
          config
        )
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse the JSON response
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          if (data.error === 200) {
            setAlertData({
              type: "success",
              message: data.message,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/UserManagement1");
            }, 3000);
          } else {
            console.log(data.message);

            setAlertData({
              type: "error",
              message: data.message,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
      console.log(response);

      // Reset form values after submission
      setValues({
        FUsrIdd: "",
        FUsrNamm: "",
        FUsrPwdd: "",
        FUsrStss: "",
        FUsrTypp: "",
        FMobNumm: "",
        FEmlAddd: "",
        loading: false,
      });

      setAlert("Image uploaded successfully.");
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <div className="col-12" style={{ color: "black" }}>
          <Header />

          <PathHead
            pageName="Utilities > UserManagement > Add User"
            screen="Get_Item"
            pageLink="/UserManagement1"
          />

          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div className="col-md-12">
              <form
                className="form"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  width: "100%",
                  border: "1px solid black",
                  maxWidth: "400px",
                  margin: "20px 0",
                  fontSize: "12px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <br />

                      <table>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              {" "}
                              <label htmlFor="code"> User Id :</label>
                            </td>
                            <td>
                              {" "}
                              <input
                                style={{
                                  width: "100px",
                                  height: "24px",
                                }}
                                type="text"
                                id="code"
                                placeholder="UserId"
                                name="FUsrIdd"
                                className="form-control"
                                value={values.FUsrIdd}
                                onChange={handleInputChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              {" "}
                              <label htmlFor="code"> Name :</label>
                            </td>
                            <td>
                              {" "}
                              <input
                                style={{
                                  width: "200px",
                                  height: "24px",
                                }}
                                type="text"
                                id="code"
                                placeholder="Name"
                                name="FUsrNamm"
                                className="form-control"
                                value={values.FUsrNamm}
                                onChange={handleInputChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <label htmlFor="code"> Password :</label>
                            </td>
                            <td>
                              <input
                                style={{
                                  width: "200px",
                                  height: "24px",
                                }}
                                type="password"
                                id="code"
                                placeholder="Password"
                                name="FUsrPwdd"
                                className="form-control"
                                value={values.FUsrPwdd}
                                onChange={handleInputChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <label htmlFor="status">Status:</label>
                            </td>
                            <td>
                              <select
                                name="FUsrStss"
                                value={values.FUsrStss} // Bind the selectedStatus state to the select value
                                onChange={handleInputChange} // Update the selectedStatus state on change
                                className="form-control"
                                style={{
                                  width: "130px",
                                  height: "27px",
                                  fontSize: "9px",
                                }}
                              >
                                <option value="">Select Status</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <label htmlFor="type">Type:</label>
                            </td>
                            <td>
                              <select
                                name="FUsrTypp"
                                value={values.FUsrTypp} // Bind the selectedType state to the select value
                                onChange={handleInputChange} // Update the selectedType state on change
                                className="form-control"
                                style={{
                                  width: "130px",
                                  height: "27px",
                                  fontSize: "9px",
                                }}
                              >
                                <option value="">Select Type</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              {" "}
                              <label htmlFor="code"> Mobile# :</label>
                            </td>
                            <td>
                              <input
                                style={{
                                  width: "250px",
                                  height: "24px",
                                }}
                                type="text"
                                id="code"
                                placeholder="Mobile#"
                                name="FMobNumm"
                                className="form-control"
                                value={values.FMobNumm}
                                onChange={handleInputChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              {" "}
                              <label htmlFor="code"> Email Address :</label>
                            </td>
                            <td>
                              {" "}
                              <input
                                style={{
                                  width: "250px",
                                  height: "24px",
                                }}
                                type="text"
                                id="code"
                                placeholder="Email Address"
                                name="FEmlAddd"
                                className="form-control"
                                value={values.FEmlAddd}
                                onChange={handleInputChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-primary"
                                style={{
                                  backgroundColor: primaryColor,
                                  height: "4%",
                                  fontSize: "11px",
                                  color: secondaryColor,
                                  width: "50%",
                                }}
                                onClick={handleFormSubmit}
                              >
                                SUBMIT
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Form>
                <div className="form-group">
                  <br />

                  {/* <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code"> User Id :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      style={{
                        width: "70px",
                        height:'20px'
                      }}
                      type="text"
                      id="code"
                      placeholder="UserId"
                      name="FUsrIdd"
                      className="form-control"
                      value={values.FUsrIdd}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code"> Name :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      style={{
                        width: "200px",
                        height:'20px'
                      }}
                      type="text"
                      id="code"
                      placeholder="Name"
                      name="FUsrNamm"
                      className="form-control"
                      value={values.FUsrNamm}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code"> Password :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      style={{
                        width: "200px",
                        height:'20px'
                      }}
                      type="password"
                      id="code"
                      placeholder="Password"
                      name="FUsrPwdd"
                      className="form-control"
                      value={values.FUsrPwdd}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="status">Status:</label>
                  </div>
                  <div className="col-md-9">
                    <select
                      name="FUsrStss"
                      value={values.FUsrStss} // Bind the selectedStatus state to the select value
                      onChange={handleInputChange} // Update the selectedStatus state on change
                      className="form-control"
                      style={{ width: "130px" ,height:'25px',fontSize:'9px' }}
                    >
                      <option value="">Select Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="type">Type:</label>
                  </div>
                  <div className="col-md-9">
                    <select
                      name="FUsrTypp"
                      value={values.FUsrTypp} // Bind the selectedType state to the select value
                      onChange={handleInputChange} // Update the selectedType state on change
                      className="form-control"
                      style={{ width: "130px",height:'25px',fontSize:'9px' }}
                    >
                      <option value="">Select Type</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>

               

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code"> Mobile# :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      style={{
                        width: "250px",
                        height:'20px'
                      }}
                      type="text"
                      id="code"
                      placeholder="Mobile#"
                      name="FMobNumm"
                      className="form-control"
                      value={values.FMobNumm}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code"> Email Address :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      style={{
                        width: "250px",
                        height:'20px'
                      }}
                      type="text"
                      id="code"
                      placeholder="Email Address"
                      name="FEmlAddd"
                      className="form-control"
                      value={values.FEmlAddd}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div style={{ marginRight: "25%" }}>
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color:secondaryColor,
                      width: "20%",
                      marginRight: "2%",
                    }}
                    onClick={handleFormSubmit}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/UserManagement1")}
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "18%",
                      marginRight: "2%",
                    }}
                  >
                    Return
                  </button>
                </div> */}
                  <br />
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AddUser1;
