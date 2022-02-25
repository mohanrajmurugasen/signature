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
import ArrowBackIosNewIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

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

function QuickPay(props) {
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  const [datas, setDatas] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    authAxios
      .post("chit_customer_collection_due_list", { mobile_no: `${user}` })
      .then((res) => {
        setDatas(res.data.data);
      })
      .catch((err) => console.error(err.message));
  }, [user]);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(datas.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(datas.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, datas]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % datas.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const height = window.innerHeight;

  return (
    <div
      className="pending pt-4 pb-4"
      style={{ height: height - 191, overflow: "auto" }}
    >
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell>Scheme Name</StyledTableCell>
                <StyledTableCell>Chit Code</StyledTableCell>
                <StyledTableCell>Due amount</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems &&
                currentItems.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.customer_name}
                    </StyledTableCell>
                    <StyledTableCell>{row.chit_scheme_name}</StyledTableCell>
                    <StyledTableCell>{row.chit_code_name}</StyledTableCell>
                    <StyledTableCell>{row.due_amount}</StyledTableCell>
                    <StyledTableCell style={{ width: "150px" }}>
                      <Button
                        variant="contained"
                        onClick={() => setModalShow(true)}
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
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
}

export default QuickPay;
