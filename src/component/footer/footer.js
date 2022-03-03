import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <div>
          <p style={{ color: "gray", textAlign: "center" }}>
            Copyright © 2022 Lakshmi Jewellary, All Rights Reserved
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
