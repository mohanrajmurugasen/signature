import React, { useEffect, useState } from "react";
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
import "./chitdetails.css";
import "./passbook.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useSelector } from "react-redux";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PassBook(props) {
  const cust = JSON.parse(
    CryptoJS.AES.decrypt(
      JSON.parse(JSON.stringify(localStorage.getItem("cust"))),
      "cust"
    ).toString(CryptoJS.enc.Utf8)
  );
  const head = JSON.parse(
    CryptoJS.AES.decrypt(
      JSON.parse(JSON.stringify(localStorage.getItem("headingss"))),
      "headingss"
    ).toString(CryptoJS.enc.Utf8)
  );
  const passbook = JSON.parse(localStorage.getItem("passbooks"));
  const [datas, setDatas] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const payments = null;
  const [payCount, setpayCount] = React.useState(1);

  useEffect(() => {
    authAxios
      .post("chit_collection_pass_book", { chit_code_id: cust })
      .then((res) => {
        // console.log(res.data);
        setDatas(res.data);
      })
      .catch((err) => console.error(err.message));
  }, [cust]);
  const height = window.innerHeight;

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

  const print = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="tabHeads">
          <TableRow>
            <StyledTableCell className="th">Ins No.</StyledTableCell>
            <StyledTableCell className="th">Rcpt Date</StyledTableCell>
            <StyledTableCell className="th">Rcpt No.</StyledTableCell>
            <StyledTableCell className="th">Due Amount</StyledTableCell>
            <StyledTableCell className="th">Due Weight</StyledTableCell>
            <StyledTableCell className="th">Rate</StyledTableCell>
            <StyledTableCell className="th">Weight</StyledTableCell>
            <StyledTableCell className="th">Total Weight</StyledTableCell>
            <StyledTableCell className="th">Payment Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas &&
            datas.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" className="th">
                  {row.ins_no}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" className="th">
                  {row.receipt_date}
                </StyledTableCell>
                <StyledTableCell className="th">
                  {row.receipt_no}
                </StyledTableCell>
                <StyledTableCell className="th">
                  {row.due_amount}
                </StyledTableCell>
                <StyledTableCell className="th">
                  {row.due_weight}
                </StyledTableCell>
                <StyledTableCell className="th">{row.rate}</StyledTableCell>
                <StyledTableCell className="th">{row.weight}</StyledTableCell>
                <StyledTableCell className="th">
                  {row.total_weight}
                </StyledTableCell>
                <StyledTableCell className="th">
                  {row.payment_type}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
              {passbook.chit_scheme_name}
            </h6>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <h6 className="pt-3 pb-2 maturity3">
              <b>Code: </b>
              {passbook.chit_code}
            </h6>
          </Col>
          {/* <PrintComponents
            trigger={
              <Button variant="outlined" className="printer">
                Print
              </Button>
            }
          >
            {print}
          </PrintComponents> */}
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6} xs={6}>
            <h6 className="pt-3 pb-2">
              <b>Joining Date: </b>
              {passbook.join_date}
            </h6>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6}>
            <h6 className="pt-3 pb-2 maturity">
              <b>Maturity Date: </b>
              {passbook.maturity_date}
            </h6>
          </Col>
        </Row>
        {print}
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

export default PassBook;
