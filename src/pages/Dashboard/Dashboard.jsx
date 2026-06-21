import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Dashboard.css";

import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = Cookies.get("jwt_token");

      const response = await api.get("/referrals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(response.data.data);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Failed to fetch data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (errorMsg) {
    return <h1>{errorMsg}</h1>;
  }

  const filteredReferrals = dashboardData.referrals
    .filter(
      (referral) =>
        referral.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        referral.serviceName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const totalPages = Math.ceil(
    filteredReferrals.length / itemsPerPage
  );

  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Referral Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Track your referrals, earnings and
          partner activity in one place.
        </p>

        <h2>Overview</h2>

        <div className="overview-grid">
          {dashboardData.metrics.map((metric) => (
            <div
              key={metric.id}
              className="metric-card"
            >
              <h3 className="metric-value">
                {metric.value}
              </h3>

              <p className="metric-label">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <br />

        <h2>Service Summary</h2>

        <div className="section-card">
          <p>
            <strong>Service:</strong>{" "}
            {dashboardData.serviceSummary.service}
          </p>

          <p>
            <strong>Your Referrals:</strong>{" "}
            {
              dashboardData.serviceSummary
                .yourReferrals
            }
          </p>

          <p>
            <strong>Active Referrals:</strong>{" "}
            {
              dashboardData.serviceSummary
                .activeReferrals
            }
          </p>

          <p>
            <strong>Total Ref Earnings:</strong>{" "}
            {
              dashboardData.serviceSummary
                .totalRefEarnings
            }
          </p>
        </div>

        <br />

        <h2>Refer Friends And Earn More</h2>

        <div className="section-card">
          <p>
            <strong>Referral Link:</strong>
          </p>

          <p>{dashboardData.referral.link}</p>

          <button
            className="primary-btn"
            onClick={() => {
              navigator.clipboard.writeText(
                dashboardData.referral.link
              );
              alert("Referral link copied!");
            }}
          >
            Copy Link
          </button>

          <br />
          <br />

          <p>
            <strong>Referral Code:</strong>
          </p>

          <p>{dashboardData.referral.code}</p>

          <button
            className="primary-btn"
            onClick={() => {
              navigator.clipboard.writeText(
                dashboardData.referral.code
              );
              alert("Referral code copied!");
            }}
          >
            Copy Code
          </button>
        </div>

        <br />

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or service"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="desc">
              Newest First
            </option>

            <option value="asc">
              Oldest First
            </option>
          </select>
        </div>

        <h2>All Referrals</h2>

        <table className="referral-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {paginatedReferrals.map(
              (referral) => (
                <tr
                  key={referral.id}
                  onClick={() =>
                    navigate(
                      `/referral/${referral.id}`,
                      {
                        state: referral,
                      }
                    )
                  }
                >
                  <td>{referral.name}</td>

                  <td>
                    {referral.serviceName}
                  </td>

                  <td>{referral.date}</td>

                  <td>
                    $
                    {referral.profit.toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of{" "}
            {totalPages}
          </span>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
