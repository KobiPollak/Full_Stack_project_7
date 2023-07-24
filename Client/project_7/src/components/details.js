import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";

const Details = () => {
  const { id } = useParams();

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetData = () => {
    setLoading(true);

    // Make the Axios request to your server API
  };
  useEffect(() => {
    // Function to fetch data using Axios
    axios
      .get("http://localhost:3100/users/userDetails")
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    // fetchData(); // Call the fetch function on component mount
  }, []); // Empty dependency array means it will run only once on mount

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Axios Request Example
        </Typography>
        <Button
          onClick={handleGetData}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Data"}
        </Button>
        {response && (
          <div>
            <Typography variant="h6">Response:</Typography>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
