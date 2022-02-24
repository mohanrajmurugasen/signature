import React, { useEffect } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import "./chitdetails.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Divider, Link } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import authAxios from "../interceptor/interceptor";
import { useSelector } from "react-redux";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProfileDetail(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [datas, setdatas] = React.useState([]);
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  const name = [
    { name: "Ledger Name" },
    { name: "Address" },
    { name: "Allow Credit Bill" },
    { name: "Code" },
    { name: "Date of Birth" },
    { name: "Email" },
    { name: "Flag" },
    { name: "Gstin Number" },
    { name: "Id" },
    { name: "IsArchive" },
    { name: "Ledger Id" },
    { name: "Mobile Number" },
    { name: "Pan Number" },
    { name: "Phone Number" },
    { name: "Place" },
    { name: "Place Id" },
    { name: "SetActive" },
    { name: "Short Name" },
    { name: "Website" },
    { name: "Wedding Anniversary Date" },
  ];
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
      })
      .catch((err) => console.error(err.message));
  }, []);
  console.log(datas);
  return (
    <div className="chitdetail pt-3 pb-3">
      <Container>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={8} md={10} sm={12}>
              <div className="light">
                <h4 className="pt-2 ps-4 pb-2">
                  <b>Contact Details</b>
                </h4>
                <Divider />
                {name.map((itm, index) => (
                  <Row className="pt-3 ps-4 pb-1" key={index}>
                    <Col lg={3} md={3} sm={3} xs={3}>
                      <p className="fw-normal address">{itm.name}</p>
                    </Col>
                    {datas.map((itms, index) =>
                      itm.name === "Code" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>{itms.code}</b>
                          </p>
                        </Col>
                      ) : itm.name === "Ledger Name" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.ledger_name === null ||
                              itms.ledger_name === ""
                                ? "--------"
                                : itms.ledger_name}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Address" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.address1 === null || itms.address1 === ""
                                ? "--------"
                                : itms.address1 + itms.address2 + itms.address3}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Allow Credit Bill" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.allow_credit_bill === null ||
                              itms.allow_credit_bill === ""
                                ? "--------"
                                : itms.allow_credit_bill}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Date of Birth" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.dob === null || itms.dob === ""
                                ? "--------"
                                : itms.dob}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Email" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.email_id === null || itms.email_id === ""
                                ? "--------"
                                : itms.email_id}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Flag" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.flag === null || itms.flag === ""
                                ? "--------"
                                : itms.flag}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Gstin Number" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.gstin_no === null || itms.gstin_no === ""
                                ? "--------"
                                : itms.gstin_no}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Id" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.id === null || itms.id === ""
                                ? "--------"
                                : itms.id}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "IsArchive" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.is_archive === null ||
                              itms.is_archive === ""
                                ? "--------"
                                : itms.is_archive}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Ledger Id" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.ledger_id === null || itms.ledger_id === ""
                                ? "--------"
                                : itms.ledger_id}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Ledger Name" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.ledger_name === null ||
                              itms.ledger_name === ""
                                ? "--------"
                                : itms.ledger_name}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Mobile Number" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.mobile_no === null || itms.mobile_no === ""
                                ? "--------"
                                : itms.mobile_no}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Name" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.name === null || itms.name === ""
                                ? "--------"
                                : itms.name}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Pan Number" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.pan_no === null || itms.pan_no === ""
                                ? "--------"
                                : itms.pan_no}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Phone Number" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.phone_no === null || itms.phone_no === ""
                                ? "--------"
                                : itms.phone_no}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Place" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.place === null || itms.place === ""
                                ? "--------"
                                : itms.place}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Place Id" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.place_id === null || itms.place_id === ""
                                ? "--------"
                                : itms.place_id}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "SetActive" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.setActive === null || itms.setActive === ""
                                ? "--------"
                                : itms.setActive}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Short Name" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.short_name === null ||
                              itms.short_name === ""
                                ? "--------"
                                : itms.short_name}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Website" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.website === null || itms.website === ""
                                ? "--------"
                                : itms.website}
                            </b>
                          </p>
                        </Col>
                      ) : itm.name === "Wedding Anniversary Date" ? (
                        <Col lg={8} md={8} sm={8} xs={8} key={index}>
                          <p className="fw-normal details">
                            <b>
                              {itms.wedding_anniversary_date === null ||
                              itms.wedding_anniversary_date === ""
                                ? "--------"
                                : itms.wedding_anniversary_date}
                            </b>
                          </p>
                        </Col>
                      ) : null
                    )}
                  </Row>
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
                  <span
                    className="text-primary"
                    style={{ fontSize: "small", cursor: "pointer" }}
                  >
                    Click here to know your Updates
                  </span>
                </div>
                <Divider style={{ color: "darkgray" }} />
                <div
                  className="ps-2 pt-3"
                  style={{ marginRight: 5, cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between">
                    <p style={{ fontSize: "small" }}>
                      <b>Stop SDP</b>
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
                  <div className="d-flex justify-content-between">
                    <p style={{ fontSize: "small" }}>
                      <b>Update Contact Details</b>
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
                  <div className="d-flex justify-content-between">
                    <p className="fw-normal" style={{ fontSize: "small" }}>
                      <b>Read about fraud aeareness</b>
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
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
}

export default ProfileDetail;
