import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "../styles/details.css";

const MDetails = () => {
  const { id } = useParams();

  const [response, setResponse] = useState("");
  const [properties, setProperties] = useState("");

  useEffect(() => {
    // Function to fetch data using Axios
    axios
      .get(`http://localhost:3100/users/userDetails/${id}`)
      .then((response) => {
        console.log(response);
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    axios
      .get(`http://localhost:3100/maneger/propertiesDetails/${id}`)
      .then((response) => {
        setProperties(response);
      })
      .catch((err) => console.log("Error fetching data:", err));

    // fetchData(); // Call the fetch function on component mount
  }, []); // Empty dependency array means it will run only once on mount

  return (
    <>
      {/* <Card> */}
      <div className="user-card">
        <div className="user-header">
          <h2>personal information:</h2>
        </div>
        <div className="user-body">
          <p>
            <strong>Full Name:</strong> {response.fullName}
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
          <h2>properties under your information:</h2>
        </div>
        {/* <div className="user-body">
          <p>
            <strong>Address:</strong> {response.address}
          </p>
          <p>
            <strong>City:</strong> {response.city}
          </p>
          <p>
            <strong>Apartment:</strong> {response.apartment}
          </p>
        </div> */}
        <table>
          <thead>
            <tr>
              {Object.keys(properties[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-card">
        <div className="user-header">
          <h2>Garbage Removal Times:</h2>
        </div>
        <div className="user-body">
          <p>
            <strong>Day:</strong> {response.day_of_week}
          </p>
          <p>
            <strong>Time:</strong> {response.collection_time}
          </p>
        </div>
      </div>
      <div className="user-header">
        <h2>General Payment Details:</h2>
      </div>
      <div className="user-body">
        <p>
          <strong>Fixed monthly amount:</strong> {response.base_payment_amount}
        </p>
        <p>
          <strong>Extra Payment Amount:</strong>{" "}
          {response.extra_payment_amount ? response.extra_payment_amount : 0}
        </p>
        <p>
          <strong>Reason For Extra payment:</strong>{" "}
          {response.extra_payment_description
            ? response.extra_payment_description
            : "There is no extras this month"}
        </p>
      </div>
      {/* </Card> */}
    </>
  );
};

export default MDetails;
