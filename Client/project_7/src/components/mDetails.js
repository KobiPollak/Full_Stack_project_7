import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "../styles/details.css";

const MDetails = () => {
  const { id } = useParams();

  axios.defaults.headers.common["authorization"] =
    localStorage.getItem("token");

  const [response, setResponse] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Function to fetch data using Axios
    axios
      .get(`http://localhost:3100/manager/${id}/managerDetails`)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`http://localhost:3100/manager/${id}/allProperties`)
      .then((response) => {
        setProperties(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []); // Empty dependency array means it will run only once on mount

  return (
    <>
      <div className="user-card" style={{ paddingTop: "350px" }}>
        <div className="user-header">
          <h2>personal information:</h2>
        </div>
        <div className="user-body">
          <p>
            <strong>Full Name:</strong> {response.full_name}
          </p>
          <p>
            <strong>Email:</strong> {response.email}
          </p>
          <p>
            <strong>Phone:</strong> {response.phone}
          </p>
        </div>
      </div>
      {/* </Card>
      <Card> */}
      <div className="user-card">
        <div className="user-header">
          <h2>properties under your responsibility:</h2>
        </div>
        {properties.map((property) => (
          <div className="user-body">
            <p>
              <strong>Property Id:</strong> {property.id}
            </p>
            <p>
              <strong>Address:</strong> {property.address}
            </p>
            <p>
              <strong>City:</strong> {property.city}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MDetails;