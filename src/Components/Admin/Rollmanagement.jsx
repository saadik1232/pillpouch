import React, { useEffect, useState } from "react";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import rolemanagement from "../../assets/images/rolemanagement.png";
import usermanage from "../../assets/images/usermanage.png";
import { useNavigate } from "react-router-dom";

export default function AddAppointments() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-overlay"></div>
      <div className="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section className="content-section role-management">
          <div className="container">
            <div className="row justify-content-center mt-4 mt-lg-5">
              <div className="col-md-3 mt-4 mt-lg-5">
                <div
                  className="card-btns"
                  onClick={(e) => navigate("/rollsmang")}
                >
                  <img src={rolemanagement} alt="" />
                  <h3>Role Management</h3>
                </div>
              </div>
              <div className="col-md-3 mt-4 mt-lg-5">
                <div
                  className="card-btns"
                  onClick={(e) => navigate("/usermanagement")}
                >
                  <img src={usermanage} alt="" />
                  <h3> User Management</h3>
                </div>
              </div>
              {/* <div className="col-md-3 mt-4 mt-lg-5">
                <div
                  className="card-btns"
                  onClick={(e) => navigate("/pagemanag")}
                >
                  <img src={usermanage} alt="" />
                  <h3> Pages Management</h3>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
