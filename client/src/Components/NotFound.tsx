import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img src="/notfound.svg" alt="not_foundImage" height={"300px"} />
        <h1>404 - Page Not Found</h1>
        <p style={{
            marginBottom:"2rem"
        }}>Sorry, the page you are looking for does not exist.</p>
        <Link
       
          to="/"
        >
          <Button variant="outlined" color="info">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
