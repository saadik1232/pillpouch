import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userimage from "../../assets/images/user-image.png";
import {
  getlogindata,
  getpass,
  setlogindata,
  setlogindataaction,
  setpassaction,
} from "../../Store/LoginReducer";
import profileholder from "../../assets/images/profile-holder.png";
import Paths from "./Paths";
import { useEffect, useState } from "react";
import { RefreshRoles } from "../MultiComp/RefreshRoles";

export default function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userinforedux = useSelector(getlogindata);

  function getstate(ent) {
    if (ent == "" || ent == "undefined" || ent == "null") {
      return false;
    } else {
      return true;
    }
  }

  const userdata = useSelector(getlogindata);

  const pass = useSelector(getpass);

  const [state, setstate] = useState(false);

  useEffect(() => {
    //onenter();
    // console.log(
    //   "use effect for route protector and data from redux in the top nav",
    //   userdata
    // );
    // if (localStorage.getItem("userid")) {
    //   setstate(true);
    //   RefreshRoles(userdata, dispatch, pass).then((res) => {
    //     setstate(false);
    //     console.log("api hit to refresh roles", res.data.data);
    //     let path = res.data.data;
    //     dispatch(setlogindataaction(path));
    //   });
    //   //RefreshRoles(userdata, dispatch, pass);
    // }
    return () => {};
  }, []);

  return (
    <>
      <header class="header-dashboard">
        <div class="header-inner">
          <div class="row align-items-center">
            {/* <div class="col-5">
              <i class="fas fa-bars d-block d-md-none float-left"></i>
            </div> */}
            <div className="col-md-2 col-sm-4 col-6">
              <img src={logo} alt="Pillpouch" />
            </div>
            <div class="col-md-7 justify-content-center d-flex hidden-after-tab">
              <ul className="topmenu">
                <li>
                  {/* <NavLink>Dashboard</NavLink> */}
                  {/* <a href="#" className="active">
                    Dashboard
                  </a> */}
                </li>

                <Paths />
                {/* <li>
                  <a href="#">Appointments</a>
                </li>
                <li>
                  <a href="#">Patient</a>
                </li>
                <li>
                  <a href="#">Messages</a>
                </li>
                <li>
                  <a href="#">Finances</a>
                </li> */}
              </ul>
              {/* <input
                type="search"
                class="form-control search-top"
                placeholder="Search patients or doctors"
              /> */}
            </div>
            <div class="col-md-3 col-sm-6 col-6">
              <div class="nav-holder">
                <ul class="topnav">
                  <li class="topnav-item user-item">
                    <a
                      href="#"
                      class="topnav-link"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <strong class="user-image">
                        {/* {localStorage.getItem("img") !== "" ? (
                          <img src={localStorage.getItem("img")} alt="" />
                        ) : (
                          <img src={userimage} alt="" />
                        )} */}

                        {getstate(localStorage.getItem("img")) == true ? (
                          <img src={localStorage.getItem("img")} alt="" />
                        ) : (
                          <img src={profileholder} alt="" />
                        )}
                      </strong>
                      <div class="user-detail">
                        <span class="user-name">
                          {" "}
                          {userinforedux.length !== 0 ? userinforedux.name : ""}
                          {/* {localStorage.getItem("username")}{" "} */}
                        </span>
                        <span class="user-profile user-role">
                          {" "}
                          {userinforedux.length !== 0
                            ? userinforedux.specialization
                            : ""}
                          {/* {localStorage.getItem("special")}{" "} */}
                        </span>
                      </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <div className="dropdown-item profile-options">
                        <span className="name-wrap">JA</span>
                        <h2 className="doctor-name">
                          {userinforedux.length !== 0 ? userinforedux.name : ""}
                          {/* {localStorage.getItem("username")}{" "} */}
                          <span>
                            {/* {localStorage.getItem("special")} */}
                            {userinforedux.length !== 0
                              ? userinforedux.specialization
                              : ""}
                          </span>
                        </h2>
                      </div>
                      {localStorage.getItem("usertype_id") == "2" ? (
                        <Link
                          to={"/doctorprofile"}
                          state={{ edit: true }}
                          class="dropdown-item"
                        >
                          My Account
                        </Link>
                      ) : (
                        <Link to={"/userprofile"} class="dropdown-item">
                          My Account
                        </Link>
                      )}

                      <Link
                        to={"/signin"}
                        onClick={() => {
                          dispatch(setlogindataaction([]));
                          dispatch(setpassaction(""));
                          console.log("tests");
                          localStorage.clear();
                        }}
                        class="dropdown-item"
                      >
                        Logout
                      </Link>
                    </div>
                  </li>
                  <li>
                    <i class="fas fa-bars d-block d-md-none float-left"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
