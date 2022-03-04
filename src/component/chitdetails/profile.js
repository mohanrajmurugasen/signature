import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./chitdetails.css";
import Card from "@mui/material/Card";
import { Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import authAxios from "../interceptor/interceptor";
import { useNavigate } from "react-router-dom";

function ProfileDetail(props) {
  const [datas, setdatas] = React.useState([]);
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));

  const navigate = useNavigate();
  useEffect(() => {
    authAxios
      .post("customer_list", {
        searchField: "customers.mobile_no",
        dataType: "str",
        search: user,
        is_search: 1,
        CurrentPageNumber: 1,
        PageSize: 25,
      })
      .then((res) => {
        setdatas(res.data.index);
        // console.log(res.data.index);
      })
      .catch((err) => console.error(err.message));
  }, [user]);
  const height = window.innerHeight;

  const handleClick = (x) => {
    window.open(x);
  };

  return (
    <div
      className="chitdetail pt-3 pb-3"
      style={{ height: height - 191, overflow: "auto" }}
    >
      <Container>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={8} md={10} sm={12}>
              <div className="light">
                {datas.map((itm, index) => (
                  <div key={index}>
                    <h4 className="pt-2 ps-4 pb-2">
                      <b>Contact Details</b>
                    </h4>
                    <Divider />
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Name</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.name}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Ledger Name</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.ledger_name}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Ledger Name</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.ledger_name}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Address</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.address1 + itm.address1 + itm.address1}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Code</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.code}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Date Of Birth</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.dob}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Email</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.email_id}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Mobile Number</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.mobile_no}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Number Of Chits</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.no_of_running_chit}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">Place</p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.place}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row className="pt-3 ps-4 pb-1">
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <p className="fw-normal address">
                            Wedding Anniversary Date
                          </p>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                          <p className="fw-normal details">
                            <b>{itm.wedding_anniversary_date}</b>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={3} md={10} sm={12}>
              <Card sx={{ minWidth: 275 }} className="cardDetails">
                <div className="pb-2 ps-2 pt-3">
                  <h4>Alerts</h4>
                </div>
                <Divider style={{ color: "darkgray" }} />
                <div className="pb-2 ps-2 pt-2">
                  <span className="text-primary" style={{ fontSize: "small" }}>
                    Click here to know your Updates
                  </span>
                </div>
                <Divider style={{ color: "darkgray" }} />
                <div
                  className="ps-2 pt-3"
                  style={{ marginRight: 5, cursor: "pointer" }}
                >
                  <div
                    className="d-flex justify-content-between"
                    onClick={() => navigate("/quickpay")}
                  >
                    <p style={{ fontSize: "small" }}>
                      <b>Quick Pay</b>
                    </p>
                    <ArrowForwardIcon
                      style={{
                        color: "gray",
                        fontSize: "larger",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                </div>
                <Divider style={{ color: "darkgray" }} />
                <div
                  className="ps-2 pt-3"
                  style={{ marginRight: 5, cursor: "pointer" }}
                >
                  <div
                    className="d-flex justify-content-between"
                    onClick={() =>
                      handleClick(
                        "https://lakshmijewellery.co.in/contact-us.php"
                      )
                    }
                  >
                    <p style={{ fontSize: "small" }}>
                      <b>Support</b>
                    </p>
                    <ArrowForwardIcon
                      style={{
                        color: "gray",
                        fontSize: "larger",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                </div>
                <Divider style={{ color: "darkgray" }} />
                <div
                  className="ps-2 pt-3"
                  style={{ marginRight: 5, cursor: "pointer" }}
                >
                  <div
                    className="d-flex justify-content-between"
                    onClick={() =>
                      handleClick(
                        "https://lakshmijewellery.co.in/contact-us.php"
                      )
                    }
                  >
                    <p className="fw-normal" style={{ fontSize: "small" }}>
                      <b>Contact Us</b>
                    </p>
                    <ArrowForwardIcon
                      style={{
                        color: "gray",
                        fontSize: "larger",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ProfileDetail;
