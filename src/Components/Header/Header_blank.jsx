import React from "react";
import logo from "../../assets/images/logo.png";

export default function Header_blank() {
  return (
    <>
      <div id="wrapper">
        <header class="onboard-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <a href="#" class="logo">
                  <img src={logo} alt="" />
                </a>
              </div>
              <div class="col-sm-6"></div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
