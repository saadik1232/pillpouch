import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { slide as Menu } from "react-burger-menu";

export default function Header() {
  return (
    <>
      <div id="wrapper">
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-6">
                <a href="#" className="logo-holder">
                  <img src="assets/images/logo.png" alt="" className="logo" />
                  <img src={logo} alt="" className="logo" />
                </a>
              </div>
              <div className="col-md-6 desktop-nav">
                <nav className="nav-top">
                  <ul>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/howitworks"}>How it works</Link>
                    </li>
                    <li>
                      <Link to={"/pricing"}>Pricing</Link>
                    </li>
                    <li>
                      <Link to={"/reviews"}>Reviews</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-3 desktop-nav">
                <ul className="right-nav text-lg-right">
                  <li>
                    <Link to={"/signin"}>Sign in</Link>
                  </li>
                  <li>
                    <a href="signup.php" className="btn-default btn">
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
              {/*  */}

              <div className="mobile-nav col-md-9 col-6">
                <Menu pageWrapId={"page-wrap"} outerContainerId={"App"}>
                  <a className="menu-item" href="/">
                    Home
                  </a>

                  <a className="menu-item" href="/burgers">
                    Burgers
                  </a>

                  <a className="menu-item" href="/pizzas">
                    Pizzas
                  </a>

                  <a className="menu-item" href="/desserts">
                    Desserts
                  </a>
                </Menu>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
