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
import ReactPaginate from "react-paginate";
import "./chitdetails.css";
import "./passbook.css";
import ArrowBackIosNewIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintComponents from "react-print-components";

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
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  const [datas, setDatas] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [payments, setpayments] = React.useState(null);
  const [payCount, setpayCount] = React.useState(1);
  useEffect(() => {
    authAxios
      .post("chit_customer_collection_due_list", { mobile_no: `${user}` })
      .then((res) => {
        setDatas(res.data.data);
      })
      .catch((err) => console.error(err.message));
  }, [user]);
  const height = window.innerHeight;

  const payNow = (itm) => {
    setpayments(itm.due_amount);
    setModalShow(true);
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

  const print = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="tabHeads">
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Scheme Name</StyledTableCell>
            <StyledTableCell>Chit Code</StyledTableCell>
            <StyledTableCell>Due amount</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas &&
            datas.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.customer_name}
                </StyledTableCell>
                <StyledTableCell>{row.chit_scheme_name}</StyledTableCell>
                <StyledTableCell>{row.chit_code_name}</StyledTableCell>
                <StyledTableCell>{row.due_amount}</StyledTableCell>
                <StyledTableCell style={{ width: "150px" }}>
                  <Button variant="contained" onClick={() => payNow(row)}>
                    Pay Now
                  </Button>
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
        <div className="d-flex justify-content-between">
          <h4 className="pt-3 pb-2">
            <b>DhanaSri</b>
          </h4>
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
