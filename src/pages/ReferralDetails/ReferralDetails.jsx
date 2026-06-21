import { Link, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

function ReferralDetails() {
  const location = useLocation();
  const referral = location.state;

  if (!referral) {
    return (
      <>
        <Navbar />

        <div
          style={{
            maxWidth: "1000px",
            margin: "40px auto",
            padding: "20px",
          }}
        >
          <h1>Referral Not Found</h1>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#6366f1",
            }}
          >
            ← Back to dashboard
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#6366f1",
            fontSize: "14px",
          }}
        >
          ← Back to dashboard
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "42px",
          }}
        >
          Referral Details
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Full information for this referral partner.
        </p>

        <div
          style={{
            width: "550px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "36px",
              }}
            >
              {referral.name}
            </h2>

            <span
              style={{
                backgroundColor: "#eef2ff",
                color: "#6366f1",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {referral.serviceName}
            </span>
          </div>

          <hr />

          <div style={{ padding: "16px 0" }}>
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              REFERRAL ID
            </strong>

            <p>{referral.id}</p>
          </div>

          <hr />

          <div style={{ padding: "16px 0" }}>
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              NAME
            </strong>

            <p>{referral.name}</p>
          </div>

          <hr />

          <div style={{ padding: "16px 0" }}>
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              SERVICE NAME
            </strong>

            <p>{referral.serviceName}</p>
          </div>

          <hr />

          <div style={{ padding: "16px 0" }}>
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              DATE
            </strong>

            <p>{referral.date}</p>
          </div>

          <hr />

          <div style={{ padding: "16px 0" }}>
            <strong
              style={{
                color: "#6b7280",
                fontSize: "12px",
              }}
            >
              PROFIT
            </strong>

            <p>
              $
              {referral.profit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferralDetails;