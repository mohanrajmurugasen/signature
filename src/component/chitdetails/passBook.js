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
import { Container, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import "./chitdetails.css";
import "./passbook.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintComponents from "react-print-components";
import { useSelector } from "react-redux";

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
  const cust = useSelector((state) => state.custProducts.cust);
  const head = useSelector((state) => state.headProducts.head);
  const passbook = useSelector((state) => state.pasbookProducts.passbook);
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
            <StyledTableCell>Rcpt Date</StyledTableCell>
            <StyledTableCell>Rcpt No.</StyledTableCell>
            <StyledTableCell>Due Amount</StyledTableCell>
            <StyledTableCell>Due Weight</StyledTableCell>
            <StyledTableCell>Rate</StyledTableCell>
            <StyledTableCell>Weight</StyledTableCell>
            <StyledTableCell>Total Weight</StyledTableCell>
            <StyledTableCell>Payment Type</StyledTableCell>
            <StyledTableCell>Sign</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas &&
            datas.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.receipt_date}
                </StyledTableCell>
                <StyledTableCell>{row.receipt_no}</StyledTableCell>
                <StyledTableCell>{row.due_amount}</StyledTableCell>
                <StyledTableCell>{row.due_weight}</StyledTableCell>
                <StyledTableCell>{row.rate}</StyledTableCell>
                <StyledTableCell>{row.weight}</StyledTableCell>
                <StyledTableCell>{row.total_weight}</StyledTableCell>
                <StyledTableCell>{row.payment_type}</StyledTableCell>
                <StyledTableCell></StyledTableCell>
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
        <div className="d-flex justify-content-between">
          <h6 className="pt-3 pb-2">
            <b>Name: </b>
            {head}
          </h6>
          <h6 className="pt-3 pb-2">
            <b>Joining Date: </b>
            {passbook.join_date}
          </h6>
          <h6 className="pt-3 pb-2">
            <b>Code: </b>
            {passbook.chit_code}
          </h6>
          <h6 className="pt-3 pb-2">
            <b>Maturity Date: </b>
            {passbook.maturity_date}
          </h6>
          <PrintComponents
            trigger={
              <Button variant="outlined" className="printer">
                Print
              </Button>
            }
          >
            {print}
          </PrintComponents>
        </div>
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
