import React from "react";
import { useSelector } from "react-redux";
import ChitDetail from "../chitdetails/chitDetail";
import Main from "../chitdetails/main";
import PassBook from "../chitdetails/passBook";
import Pending from "../chitdetails/pending";
import ProfileDetail from "../chitdetails/profile";
import QuickPay from "../chitdetails/quickpay";
import Footer from "../footer/footer";
import Header from "../header/header";

function Dashboard(props) {
  const head = useSelector((state) => state.headProducts.head);
  // console.log(window.innerHeight);

  return (
    <div>
      <Header />
      {head === "home" ? (
        <ChitDetail />
      ) : head === "profile" ? (
        <ProfileDetail />
      ) : head === "pending" ? (
        <Pending />
      ) : head === "quickpay" ? (
        <QuickPay />
      ) : head === "main" ? (
        <Main />
      ) : head === "passbook" ? (
        <PassBook />
      ) : null}
      <Footer />
    </div>
  );
}

export default Dashboard;
