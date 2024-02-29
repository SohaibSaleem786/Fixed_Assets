



import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from '../../../MainComponent/Header/Header';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import Footer from '../../../MainComponent/Footer/Footer';

function Update_Table() {
  const navigate = useNavigate();
  const { t_id } = useParams();
  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks ,fontFamily} = useTheme();

  const imageurl = `${apiLinks}/ctgImg/`;

  const [user, setUser] = useState({
    t_id: '',
    t_name: '',
    t_status:'',
    

  });

  useEffect(() => {
    fetch(
      `${apiLinks}/TableList.php?t_id=${t_id}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.t_id === t_id);
        setUser(user);
        setPreviewImage(user.tctgpic ? imageurl + user.tctgpic : '');


      })
      .catch((error) => console.error(error));
  }, [t_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    FCtgDscc: "",
    FCtgStss: "",
    pic1 : '',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic1-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }


  const UserId = 33;
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // setUsers(userData);
      console.log(userData);
      console.log("user id is", userData.tusrid);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = new FormData();
    requestBody.append("id", user.t_id);
    requestBody.append("tableName", user.t_name);
    requestBody.append("status", user.t_status);

    // if (selectedImage1) {
    //   requestBody.append("pic1", selectedImage1);
    // }

    axios
      .post(
        `${apiLinks}/UpdateTable.php?t_id=${t_id}`,
        requestBody
      )
      
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Table");
          }, 1000);
          
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
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
  };


  
  useEffect(() => {
    if (selectedImage1) {
      document.getElementById("pic1-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);


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
<Header />

<PathHead pageName="File > Table Maintenance > Update Table" screen='Get_Item' pageLink="/Get_Table"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold',fontFamily:fontFamily }}>
        

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
          <div className="col-md-12 form-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            margin: "20px 0",
            fontSize:'12px',
            border: "1px solid black",position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
          }}
          >
            <Form onSubmit={handleSubmit}>
            <div className="row">


              <table>
                <tbody>
                  <tr>
                    <td>  <Form.Group controlId="Id" style={{  display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Id :</Form.Label>
      
    </Form.Group></td>
                    <td>  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
         type="text"
         id="code"
         placeholder=" Id"
         className="form-control"
         name="t_id"
         value={user.t_id}
         style={{height:'24px', width:'70px' }}
         onChange={handleInputChange}
         disabled
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                    <Form.Group controlId="description" style={{  display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Table Number:</Form.Label>
     
    </Form.Group>
                    </td>
                    <td>   <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center'}}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Description"
        className="form-control"
        name="t_name"
        value={user.t_name}
        style={{height:'24px'}}
        onChange={handleInputChange}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                 
                  <tr>
                    <td>   <Form.Group controlId="status" style={{  display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Status:</Form.Label>
 

    </Form.Group></td>
                    <td>   <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
     <Form.Control

as="select"

  name="t_status"
  value={user.t_status}
  onChange={handleInputChange}
  className="form-control"
  style={{ height: '27px', fontSize: '11px', width: '70px' }}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>

    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "50%",
                    }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button></td>
                  </tr>
                </tbody>
              </table>





</div>


                
              </Form>
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Update_Table;