import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <div className="d-flex justify-content-between">
          <p style={{ color: "gray" }}>
            Copyright © 2022 Life Insurance Corporation of India, All Rights
            Reserved
          </p>
          <p style={{ color: "#1976d2", cursor: "pointer" }}>
            Signature1.com <CreditScoreIcon />
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
