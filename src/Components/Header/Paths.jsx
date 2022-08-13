import React from "react";
import { useSelector } from "react-redux";
import { getlogindata } from "../../Store/LoginReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { pagesid, pagesidwithpath } from "../MultiComp/Utils";

export default function Paths() {
  let activeClassName = "underline";
  const navigate = useNavigate();

  const logindataredux = useSelector(getlogindata);

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
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active dashboard" : "nav-link dashboard"
          }
          to={"/dashboard"}
        >
          <strong class="icon"></strong>
          <span class="text">Dashboard</span>
        </NavLink>
      </li>

      {logindataredux && (
        <>
          {logindataredux.role &&
            logindataredux.role.map((ent) => {
              return (
                ent.permissions[0].status == true && (
                  <li>
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
                  </li>
                )
              );
            })}
        </>
      )}
    </>
  );
}
