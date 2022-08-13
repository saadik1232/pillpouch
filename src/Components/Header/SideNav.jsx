import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { getlogindata } from "../../Store/LoginReducer";
import { pagesid, pagesidwithpath } from "../MultiComp/Utils";

export default function SideNav() {
  let activeClassName = "underline";
  const navigate = useNavigate();

  const logindataredux = useSelector(getlogindata);

  useEffect(() => {
    //console.log("logindaat from redux", logindataredux);
  }, []);

  const togetpath = (id) => {
    let val = pagesidwithpath.filter((ent) => ent.id == id);
    if (val.length > 0) {
      return val[0].path;
    } else {
      return "/dashboard";
    }
  };

  function togeticon(id) {
    let val = pagesidwithpath.filter((ent) => ent.id == id);
    //console.log("icon name", val);
    if (val.length > 0) {
      return val[0].icon;
    } else {
      return "";
    }
  }

  return (
    <>
      <aside class="sidebar">
        <div class="logo" onClick={(e) => navigate("/dashboard")}>
          <img src={logo} alt="Pillpouch" />
        </div>
        <div class="main-nav">
          {/* {localStorage.getItem("usertype_id") == "3" && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active dashboard" : "nav-link dashboard"
                }
                to={"/dashboard"}
              >
                <strong class="icon"></strong>
                <span class="text">Dashboard</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active doctors" : "nav-link doctors"
                }
                to={"/doctorList"}
              >
                <strong class="icon"></strong>
                <span class="text">Doctors</span>
              </NavLink>
            </>
          )}
          {localStorage.getItem("usertype_id") == "4" && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active dashboard" : "nav-link dashboard"
                }
                to={"/dashboard"}
              >
                <strong class="icon"></strong>
                <span class="text">Dashboard</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active doctors" : "nav-link doctors"
                }
                to={"/prescriptions"}
              >
                <strong class="icon"></strong>
                <span class="text">Orders</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active doctors" : "nav-link doctors"
                }
                to={"/doctorList"}
              >
                <strong class="icon"></strong>
                <span class="text">Doctors</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active doctors" : "nav-link doctors"
                }
                to={"/addprescription"}
              >
                <strong class="icon"></strong>
                <span class="text">Add Prescriptions</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active doctors" : "nav-link doctors"
                }
                to={"/uploadedPrescription"}
              >
                <strong class="icon"></strong>
                <span class="text"> Prescriptions</span>
              </NavLink>
            </>
          )}
          {localStorage.getItem("usertype_id") == "2" && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active dashboard" : "nav-link dashboard"
                }
                to={"/dashboard"}
              >
                <strong class="icon"></strong>
                <span class="text">Dashboard</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active appointments"
                    : "nav-link appointments"
                }
                to={"/appointments"}
              >
                <strong class="icon"></strong>
                <span class="text">Appointments</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active patients" : "nav-link patients"
                }
                to={"/patientlist"}
              >
                <strong class="icon"></strong>
                <span class="text">Patients</span>
              </NavLink>{" "}
            </>
          )} */}

          {/* new code from here */}

          {/* <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active dashboard" : "nav-link dashboard"
            }
            to={"/dashboard"}
          >
            <strong class="icon"></strong>
            <span class="text">Dashboard</span>
          </NavLink>

          {logindataredux && (
            <>
              {logindataredux.role &&
                logindataredux.role.map((ent) => {
                  return (
                    ent.permissions[0].status == true && (
                      <NavLink
                        // className={({ isActive }) =>
                        //   isActive
                        //     ? "nav-link active patients"
                        //     : "nav-link patients"
                        // }
                        className={({ isActive }) =>
                          isActive
                            ? "nav-link active " + togeticon(ent.page_id)
                            : "nav-link " + togeticon(ent.page_id)
                        }
                        to={togetpath(ent.page_id)}
                      >
                        <strong class="icon"></strong>
                        <span class="text">{ent.page_name}</span>
                      </NavLink>
                    )
                  );
                })}
            </>
          )} */}
        </div>
      </aside>
    </>
  );
}
