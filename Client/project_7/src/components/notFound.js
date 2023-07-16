import React from "react";
import Typography from "@mui/material/Typography";

import "../styles/notFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <Typography component="h1" variant="h5">
        404
      </Typography>
      <Typography component="p">Page Not Found</Typography>
    </div>
  );
};

export default NotFound;
