import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import authAxios from "../interceptor/interceptor";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./chitdetails.css";
import ArrowBackIosNewIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
var CryptoJS = require("crypto-js");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Pending(props) {
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  // const phone = useSelector((state) => state.phoneProducts.phone);

  const pho = localStorage.getItem("addPhone");
  const phone = JSON.parse(
    CryptoJS.AES.decrypt(pho, "addPhone").toString(CryptoJS.enc.Utf8)
  );

  // const phone = JSON.parse(localStorage.getItem("addPhone"));
  const head = JSON.parse(
    CryptoJS.AES.decrypt(
      JSON.parse(JSON.stringify(localStorage.getItem("headingss"))),
      "headingss"
    ).toString(CryptoJS.enc.Utf8)
  );
  const [modalShow, setModalShow] = React.useState(false);
  const payments = null;
  const [payCount, setpayCount] = React.useState(1);
  const [datas, setDatas] = useState([]);
  const [pays, setpays] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authAxios
        .post("chit_customer_collection_due_list", { mobile_no: `${user}` })
        .then((res) => {
          if (isMounted) {
            setDatas(res.data.data);
          }
        })
        .catch((err) => console.error(err.message));
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [user, pays]);

  const [filteredCountries, setfilteredCountries] = useState([]);

  useEffect(() => {
    const dat = datas.filter((country) => {
      return (
        country.chit_scheme_id === phone.chit_scheme_id &&
        country.customer_id === phone.customer_id &&
        country.chit_code_id === phone.chit_code_id
      );
    });
    setfilteredCountries(dat);
  }, [datas]);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredCountries.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCountries.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCountries]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredCountries.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const height = window.innerHeight;

  const payNow = (itm) => {
    var options = {
      key: "rzp_test_Gyt3Usf1nNi9Rr",
      // key: "rzp_live_OzELFB7cOYD1k0",
      key_secret: "alnHJbZrsnM9IPUl1SsrNEza",
      // key_secret: "n9DExwZeJCD3J946XUC9JfPO",
      amount: itm.due_amount * 100,
      currency: "INR",
      name: "Amount Details",
      description: "Lakshmi Jewellary",
      handler: function (response) {
        const transaction = {
          txn_no: response.razorpay_payment_id,
          card_holder_name: `${itm.customer_name}`,
          paid_amount: `${itm.paid_amount}`,
          transaction_details: [
            {
              id: itm.id,
              collection_id: itm.collection_id,
              customer_id: itm.customer_id,
              chit_scheme_id: itm.chit_scheme_id,
              due_no: `${itm.due_no}`,
            },
          ],
        };
        authAxios
          .post("store_payment_details", transaction)
          .then((val) => {
            console.log(val.data);
            setpays(!pays);
          })
          .catch((err) => console.error(err.message));
      },
      prefill: {
        name: `${itm.customer_name}`,
        email: `mohanraj1711999@gmail.com`,
        contact: `${user}`,
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const nextSubmit = () => {
    if (payCount < 3) {
      setpayCount(payCount + 1);
    } else {
      alert("Hi");
    }
  };

  const back = () => {
    if (payCount !== 0) {
      setpayCount(payCount - 1);
    }
  };

  return (
    <div
      className="pending pt-4 pb-4"
      style={{ height: height - 191, overflow: "auto" }}
    >
      <Container>
        <Row>
          <Col lg={4} md={4} sm={6} xs={6}>
            <h6 className="pt-3 pb-2">
              <b>Name: </b>
              {head}
            </h6>
          </Col>
          <Col lg={4} md={4} sm={6} xs={6}>
            <h6 className="pt-3 pb-2 maturity2">
              <b>Scheme Name: </b>
              {phone.chit_scheme_name}
            </h6>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <h6 className="pt-3 pb-2 maturity3">
              <b>Code: </b>
              {phone.chit_code}
            </h6>
          </Col>
        </Row>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="tabHeads">
              <TableRow>
                <StyledTableCell className="th">Due No</StyledTableCell>
                <StyledTableCell className="th">Due Date</StyledTableCell>
                <StyledTableCell className="th">Due amount</StyledTableCell>
                <StyledTableCell className="th"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems &&
                currentItems.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className="th">
                      {row.due_no}
                    </StyledTableCell>
                    <StyledTableCell className="th">
                      {moment(new Date(row.due_date)).format("DD-MM-YYYY")}
                    </StyledTableCell>
                    <StyledTableCell className="th">
                      {row.paid_amount}
                    </StyledTableCell>
                    <StyledTableCell className="th" style={{ width: "150px" }}>
                      <Button
                        variant="contained"
                        className="paying"
                        onClick={() => payNow(row)}
                      >
                        Pay Now
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="mt-3 paginate">
          <ReactPaginate
            nextLabel={<ArrowForwardIcon />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowBackIosNewIcon />}
            renderOnZeroPageCount={null}
          />
        </div>
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            style={{ backgroundColor: "rgb(35,113,236)", color: "white" }}
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="d-flex justify-content-between titlePay"
              style={{ width: "100%", fontSize: "18px" }}
            >
              {payCount === 1 ? (
                <div>
                  Amount Details
                  <br />
                  <p>
                    lakshmi Jewellary
                    <br />₹ {payments}
                  </p>
                </div>
              ) : payCount === 2 ? (
                <div>
                  <ArrowBackIcon onClick={back} /> User Details
                  <br />
                  <p>
                    lakshmi Jewellary
                    <br />₹ {payments}
                  </p>
                </div>
              ) : (
                <div>
                  <ArrowBackIcon onClick={back} /> Payment Method
                  <br />
                  <p>
                    lakshmi Jewellary
                    <br />₹ {payments}
                  </p>
                </div>
              )}
              <div>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setModalShow(false);
                    setpayCount(1);
                  }}
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ height: "350px", overflow: "auto" }}
            className="modalBody"
          >
            {payCount === 1 ? (
              <div>
                <p>
                  <b>Amount</b>
                </p>
                <Button fullWidth variant="outlined" style={{ color: "black" }}>
                  ₹ {payments}
                </Button>
              </div>
            ) : payCount === 2 ? (
              <div className="payUser">
                <p>
                  <b>
                    Email <span className="text-danger">*</span>
                  </b>
                </p>
                <input />
                <p className="mt-3">
                  <b>
                    Phone <span className="text-danger">*</span>
                  </b>
                </p>
                <input />
              </div>
            ) : (
              <div>
                <p>
                  <b>rgrgreg</b>
                </p>
                <Button fullWidth variant="outlined" style={{ color: "black" }}>
                  ₹ {payments}
                </Button>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" fullWidth onClick={() => nextSubmit()}>
              {payCount === 3
                ? `Pay ₹ ${payments}`
                : payCount === 2
                ? "Proceed To Pay"
                : `Next`}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Pending;
