import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./chitdetails.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Avatar, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import { addCust, addHead, addPhone } from "../../redux/action/action";
import authAxios from "../interceptor/interceptor";

function ChitDetail(props) {
  const [datas, setdatas] = React.useState([]);
  const dispatch = useDispatch();
  const chitList = (x, y, z) => {
    dispatch(addHead("pending"));
    dispatch(
      addPhone({
        x: x,
        y: y,
        z: z,
      })
    );
  };
  const id = useSelector((state) => state.idProducts.id);
  useEffect(() => {
    authAxios
      .post("chit_customer_list", {
        searchField: "customers.id",
        dataType: "str",
        search: `${id}`,
        is_search: 1,
        CurrentPageNumber: 1,
        PageSize: 25,
        show_only_current_chit: 1,
      })
      .then((res) => {
        // console.log(res.data);
        setdatas(res.data.index);
      })
      .catch((err) => console.error(err.message));
  }, [id]);
  const height = window.innerHeight;
  // console.log(datas);
  return (
    <div
      className="chitdetail pt-3 pb-3"
      style={{ height: height - 191, overflow: "auto" }}
    >
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
                {datas &&
                  datas.map((itm, index) => (
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
                                  <b>{itm.chit_scheme_name}</b>
                                </h5>
                              </div>
                            </div>

                            <div className="viewDetails">
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  chitList(
                                    itm.chit_scheme_id,
                                    itm.customer_id,
                                    itm.chit_code_id
                                  )
                                }
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
                                <p>Chit Amount (Rs)</p>
                                <span>
                                  <b>₹ 5,00,000</b>
                                </span>
                              </div>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                              <div>
                                <p>Pending Due</p>
                                <span>
                                  <b>{itm.pending_dues}</b>
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <Divider style={{ color: "darkgray" }} />
                        <CardActions className="justify-content-between">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              dispatch(addHead("passbook"));
                              dispatch(addCust(itm.chit_code_id));
                            }}
                          >
                            View Passbook
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
                  <span className="text-primary" style={{ fontSize: "small" }}>
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
                  <div className="d-flex justify-content-between">
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
                  <div className="d-flex justify-content-between">
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

export default ChitDetail;
