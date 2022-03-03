import React from "react";
import ChitDetail from "../chitdetails/chitDetail";
import Footer from "../footer/footer";
import Header from "../header/header";

function Home(props) {
  return (
    <div>
      <Header />
      <ChitDetail />
      <Footer />
    </div>
  );
}

export default Home;
