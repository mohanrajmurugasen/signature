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
import { useDispatch } from "react-redux";
import { addHead } from "../../redux/action/action";
import authAxios from "../interceptor/interceptor";

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

function ChitDetail(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [datas, setdatas] = React.useState([]);
  const [listChits, setlistChits] = React.useState([]);
  const name = [{ no: 1 }, { no: 2 }, { no: 3 }];
  const dispatch = useDispatch();
  const chitList = () => {
    dispatch(addHead("pending"));
  };
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  const uniqueNames = Array.from(
    new Set(
      listChits.map((itm) => {
        return itm.scheme;
      })
    )
  );
  useEffect(() => {
    authAxios
      .post("chit_customer_collection_due_list", { mobile_no: `${user}` })
      .then((res) => {
        // console.log(res.data.data);
        setdatas(res.data.data);
        res.data.data.map((itm) => {
          return setlistChits((listChits) => [
            ...listChits,
            { scheme: itm.chit_scheme_name },
          ]);
        });
      })
      .catch((err) => console.error(err.message));
  }, [user]);
  console.log(uniqueNames);
  return (
    <div className="chitdetail pt-3 pb-3">
      <Container>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={11} md={10} sm={12}>
              <h4 className="pt-3 pb-2">
                <b>My Relations</b>
              </h4>
            </Col>
          </Row>
        </div>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={8} md={10} sm={12}>
              <Row>
                {uniqueNames &&
                  uniqueNames.map((itm, index) => (
                    <Col key={index} lg={6} md={6} sm={12}>
                      <Card
                        sx={{ minWidth: 275, marginBottom: 5 }}
                        className="cardDetails"
                      >
                        <CardContent>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <Avatar
                                alt="Remy Sharp"
                                style={{ background: "#eee" }}
                              >
                                <CurrencyRupeeIcon
                                  style={{ color: "#343438ad" }}
                                />
                              </Avatar>
                              <div className="ps-3 mt-1 chits">
                                <h5>
                                  <b>{itm}</b>
                                </h5>
                              </div>
                            </div>

                            <div className="viewDetails">
                              <Button
                                variant="outlined"
                                // onClick={() => setModalShow(true)}
                                onClick={chitList}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <Divider style={{ color: "darkgray" }} />
                        <div className="pt-4 pb-4 ps-3">
                          <Row>
                            <Col lg={5} md={5} sm={5}>
                              <div>
                                <p>Loan Amount (Rs)</p>
                                <span>
                                  <b>14,890</b>
                                </span>
                              </div>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                              <div>
                                <p>Tenor in Months</p>
                                <span>
                                  <b>14,890</b>
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Divider style={{ color: "darkgray" }} />
                        <CardActions>
                          <Button size="small">
                            Loan Ending Date: &nbsp;
                            <b className="text-dark">23-04:2022</b>
                          </Button>
                        </CardActions>
                      </Card>
                    </Col>
                  ))}
              </Row>
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

export default ChitDetail;
