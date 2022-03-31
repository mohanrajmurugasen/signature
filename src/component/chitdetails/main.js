import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./chitdetails.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Chip, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useDispatch } from "react-redux";
// import { addHead, addId } from "../../redux/action/action";
import authAxios from "../interceptor/interceptor";
import { useNavigate } from "react-router-dom";

var CryptoJS = require("crypto-js");

function Main(props) {
  const [datas, setdatas] = React.useState([]);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));

  const height = window.innerHeight;

  useEffect(() => {
    authAxios
      .post("customer_list", {
        searchField: "customers.mobile_no",
        dataType: "str",
        search: `${user}`,
        is_search: 1,
        CurrentPageNumber: 1,
        PageSize: 25,
      })
      .then((res) => {
        // console.log(res.data);
        setdatas(res.data.index);
      })
      .catch((err) => console.error(err.message));
  }, [user]);

  const handleClick = (x) => {
    window.open(x);
  };

  const render =
    datas &&
    datas.map((itm, index) => (
      <Col key={index} lg={4} md={6} sm={12}>
        <Card
          sx={{ minWidth: 275, marginBottom: 5 }}
          className="mainCards"
          onClick={() => {
            // dispatch(addHead(itm.name));
            // dispatch(addId(itm.id));
            localStorage.setItem(
              "headingss",
              CryptoJS.AES.encrypt(
                JSON.stringify(itm.name),
                "headingss"
              ).toString()
            );
            localStorage.setItem(
              "chitDetId",
              CryptoJS.AES.encrypt(
                JSON.stringify(itm.id),
                "chitDetId"
              ).toString()
            );
            navigate("/home");
          }}
        >
          <CardContent>
            <div>
              <div className="d-flex">
                <Avatar alt="Remy Sharp" style={{ background: "#eee" }}>
                  M
                </Avatar>
                <div className="ps-3 mt-1 chits" style={{ width: "100%" }}>
                  <h5>
                    <b>{itm.name}</b>
                  </h5>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "100%" }}
                  >
                    <h5 style={{ marginTop: "17px" }}>
                      <b>Total Chit</b>
                    </h5>
                    <Chip
                      label={itm.no_of_running_chit}
                      variant="outlined"
                      className="chip"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Col>
    ));

  return (
    <div
      className="chitdetail pt-3 pb-3"
      style={{ height: height - 191, overflow: "auto" }}
    >
      <Container>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={12} md={12} sm={12}>
              <h4 className="pt-3 pb-2">
                <b>My Relations</b>
              </h4>
            </Col>
          </Row>
        </div>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={9} md={12} sm={12} xs={12}>
              <Row>{render}</Row>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12}>
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

export default Main;
