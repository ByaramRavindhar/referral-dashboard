import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          margin: 0,
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={{
          textDecoration: "none",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        Go To Dashboard
      </Link>
    </div>
  );
}

export default NotFound;