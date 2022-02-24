import React from "react";
import { useSelector } from "react-redux";
import ChitDetail from "../chitdetails/chitDetail";
import Pending from "../chitdetails/pending";
import ProfileDetail from "../chitdetails/profile";
import Header from "../header/header";

function Dashboard(props) {
  const head = useSelector((state) => state.headProducts.head);

  return (
    <div>
      <Header />
      {head === "home" ? (
        <ChitDetail />
      ) : head === "profile" ? (
        <ProfileDetail />
      ) : head === "pending" ? (
        <Pending />
      ) : null}
    </div>
  );
}

export default Dashboard;
