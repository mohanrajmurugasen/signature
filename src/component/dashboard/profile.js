import React from "react";
import ProfileDetail from "../chitdetails/profile";
import Footer from "../footer/footer";
import Header from "../header/header";

function Profile(props) {
  return (
    <div>
      <Header />
      <ProfileDetail />
      <Footer />
    </div>
  );
}

export default Profile;
