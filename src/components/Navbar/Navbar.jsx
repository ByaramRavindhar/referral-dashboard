import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="logo">Go Business</h2>

        <div className="nav-actions">
          <button className="trial-btn">
            Try for free
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;