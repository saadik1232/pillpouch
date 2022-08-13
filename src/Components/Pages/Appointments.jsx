import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

import { baseurl } from "../../Api/ApiData";

import swal from "sweetalert";
import spinnericon from "../../assets/images/spinner.gif";
import newappoint from "../../assets/images/newappoint.png";
import totalappoint from "../../assets/images/total-appoint.png";
import completeappoint from "../../assets/images/complete-appoint.png";
import { useLocation, useNavigate } from "react-router-dom";
import { parseInt } from "lodash";
import TableComp from "../MultiComp/TableComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getlogindata } from "../../Store/LoginReducer";
import { useSelector } from "react-redux";
import { pagesid } from "../MultiComp/Utils";

export default function Appointments() {
  const [AppointmentData, setAppointmentData] = useState([]);
  const [completeappoints, setcompleteappoint] = useState(null);
  const [newappoints, setnewappoint] = useState(null);
  const [totalappoints, settotalappoints] = useState(null);
  const [columns, setcolumns] = useState(null);
  const [statuslist, setstatuslist] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);

  const [paginationpage, setpaginationpage] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  //console.log("state in app", state);

  const [permisssion, setpermisssion] = useState(null);
  const rolesdataredux = useSelector(getlogindata);

  useEffect(() => {
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.appointment
    );
    console.log("permissions", tocheck);
    setpermisssion(tocheck[0].permissions);
    if (tocheck.length == 0 || tocheck[0].permissions[0].status == false) {
      navigate("/dashboard");
    }
    localStorage.setItem("ppage", 1);
    localStorage.removeItem("appid");
    localStorage.removeItem("statusid");
    getAppointments();
    getstatuslist(tocheck[0].permissions);
    if (state) {
      console.log("state exists for page detection", state);
      //setpaginationpage(state.page);
      // setoptions({
      //   custom: true,
      //   totalSize: parseInt(AppointmentData.length),
      //   page: parseInt(state.page),
      //   onPageChange: (page, sizePerPage) => {
      //     console.log("Newest page:" + page);
      //     localStorage.setItem("ppage", page);
      //   },
      // });
    }
  }, []);

  async function getAppointments() {
    setloaderstate(true);
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
    });
    //apointment_id: "1",
    //apointment_status_id: "2",

    var config = {
      method: "post",
      url: baseurl + "ListofApointments",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      },
      data: data,
    };
    //return axios(config);
    await axios(config)
      .then(function (response) {
        setloaderstate(false);
        console.log(response.data);
        setAppointmentData(response.data.data.Apointments);
        setcompleteappoint(response.data.data.CompletedApointments);
        setnewappoint(response.data.data.NewApointments);
        settotalappoints(response.data.data.TotalApointments);
        setloaderstate(false);
        if (state) {
          //setpaginationpage(state.page);
          setoptions({
            custom: true,
            totalSize: parseInt(response.data.data.Apointments.length),
            // page: parseInt(state.page),
            page: parseInt(state.page),
            onPageChange: (page, sizePerPage) => {
              console.log("Newest page:" + page);
              localStorage.setItem("ppage", page);
            },
          });
        } else {
          setoptions({
            custom: true,
            totalSize: parseInt(response.data.data.Apointments.length),
            page: 1,
            onPageChange: (page, sizePerPage) => {
              console.log("Newest page:" + page);
              localStorage.setItem("ppage", page);
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("useeffect of pagination page", paginationpage);
  }, [paginationpage]);

  async function getstatuslist(per) {
    var config = {
      method: "get",
      url: baseurl + "ListofStatuses",
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data.statuses);
        let statusdata = response.data.data.statuses;

        setcolumns([
          {
            dataField: "apointment_time",
            text: "Time",
            sort: true,
            sortCaret: (order, column) => {
              if (!order)
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort"></i>
                  </span>
                );
              else if (order === "asc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-up"></i>
                  </span>
                );
              else if (order === "desc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-down"></i>
                  </span>
                );
              return null;
            },
          },
          { dataField: "apointment_date", text: "Date", sort: true },
          {
            dataField: "patient_name",
            text: "Patient Name",
            classes: "boldname",
            sort: true,
            sortCaret: (order, column) => {
              if (!order)
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort"></i>
                  </span>
                );
              else if (order === "asc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-up"></i>
                  </span>
                );
              else if (order === "desc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-down"></i>
                  </span>
                );
              return null;
            },
            events: {
              onClick: (e, column, columnIndex, row, rowIndex) => {
                console.log(row);
                navigate(
                  `/appointmentdetail/${
                    row.apointment_id
                  }/${localStorage.getItem("userid")}`,
                  {
                    state: {
                      page: localStorage.getItem("ppage"),
                    },
                  }
                );
              },
            },
          },
          { dataField: "location", text: "Location" },
          {
            dataField: "apointment_status",
            text: "Request",
            sort: true,
            sortCaret: (order, column) => {
              if (!order)
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort"></i>
                  </span>
                );
              else if (order === "asc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-up"></i>
                  </span>
                );
              else if (order === "desc")
                return (
                  <span className="ordericon">
                    <i class="fas fa-sort-down"></i>
                  </span>
                );
              return null;
            },
            classes: (cell, row, rowIndex, colIndex) => {
              if (row.apointment_status == "Accepted") {
                return "demo-row-accepted";
              } else if (row.apointment_status == "Rejected") {
                return "demo-row-rejected";
              } else {
                return "demo-row";
              }
            },
          },
          per[2].status == true
            ? {
                dataField: "",
                text: "",
                formatter: (e, cell, row, rowIndex, extraData) => (
                  <div class="btn-group dropleft colorfulbtn">
                    <button
                      type="button"
                      class="btn btn-secondary dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                      {/* <FontAwesomeIcon icon="fas fa-ellipsis-v" /> */}
                    </button>
                    <div class="dropdown-menu">
                      <div
                        class="dropdown-item confirm-appoint"
                        onClick={(e) => {
                          changestatusapi(
                            response.data.data.statuses[0].apointment_status_id,
                            cell.apointment_id
                          );
                        }}
                      >
                        <i class="fas fa-check-circle"></i> Confirm
                        {/* <FontAwesomeIcon icon="fas fa-check-circle" />  */}
                      </div>
                      <div
                        class="dropdown-item accept-appoint"
                        onClick={(e) => {
                          changestatusapi(
                            response.data.data.statuses[1].apointment_status_id,
                            cell.apointment_id
                          );
                        }}
                      >
                        <i class="far fa-check-circle"></i>{" "}
                        {/* <FontAwesomeIcon icon="far fa-check-circle" /> */}
                        Accept
                      </div>
                      <div
                        class="dropdown-item reject-appoint"
                        onClick={(e) => {
                          changestatusapi(
                            response.data.data.statuses[2].apointment_status_id,
                            cell.apointment_id
                          );
                        }}
                      >
                        <i class="fas fa-times-circle"></i>{" "}
                        {/* <FontAwesomeIcon icon="fas fa-times-circle" /> */}
                        Reject
                      </div>
                    </div>
                  </div>
                ),
              }
            : {},
        ]);
        setstatuslist(response.data.data.statuses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changestatusapi(statusid, appid) {
    // let statusid = localStorage.getItem("statusid");
    // let appid = localStorage.getItem("appid");
    console.log("in changestatus api", statusid, appid);
    console.log(isNaN(statusid), isNaN(appid));
    if (
      statusid != null &&
      appid != null &&
      isNaN(statusid) == false &&
      isNaN(appid) == false
    ) {
      ToChangeStatus(statusid, appid);
    } else {
      swal("No Value Selected");
    }
  }

  async function ToChangeStatus(statusid, appid) {
    var data = JSON.stringify({
      apointment_id: appid,
      user_id: localStorage.getItem("userid"),
      apointment_status_id: statusid,
    });

    var config = {
      method: "post",
      url: baseurl + "ChangeStatus",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.success);
        swal(res.data.message).then(() => {
          if (res.data.success == "true") {
            getAppointments();
          }
        });
      })
      .catch(function (error) {
        console.log("test", error);
      });
  }

  function gotoAddApp() {
    navigate("/addappointmentsnew");
  }

  const [options, setoptions] = useState(null);

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        {loaderstate == true ? (
          <>
            {" "}
            <section class="content-section">
              <div className="gifloader">
                <img src={spinnericon} alt="" />
              </div>
            </section>{" "}
          </>
        ) : (
          <>
            <section class="content-section">
              {/* <h1>Appointments</h1> */}
              <div class="container">
                <div class="row appoint-info">
                  <div class="col-md-4">
                    <div class="info-box">
                      <div class="text">
                        <h5>Total Appointements</h5>
                        <h3 class="numbers">{totalappoints}</h3>
                      </div>
                      <div class="img-holder">
                        <img src={newappoint} alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="info-box info-box1">
                      <div class="text">
                        <h5>Today's appointments </h5>
                        <h3 class="numbers">{newappoints}</h3>
                      </div>
                      <div class="img-holder">
                        <img src={completeappoint} alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="info-box info-box2">
                      <div class="text">
                        <h5>Completed Appointments </h5>
                        <h3 class="numbers">{completeappoints}</h3>
                      </div>
                      <div class="img-holder">
                        <img src={totalappoint} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="patient-listing">
                  <div class="row mt-4">
                    <div class="col-md-12">
                      <div class="patients-info">
                        <div className="row mb-5">
                          <div class="col-lg-8">
                            <h2 class="main-title">Appointments</h2>
                          </div>
                          <div class="col-lg-4 text-right">
                            {permisssion[1].status == true ? (
                              <button
                                onClick={gotoAddApp}
                                class="btn btn-add-patient"
                              >
                                Add Appointment
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div id="table-holder">
                          {statuslist && AppointmentData && options && (
                            <TableComp
                              keyfield="apointment_id"
                              data={AppointmentData}
                              columns={columns}
                              options={options}
                              placeholertext={
                                "Search by Patient Name, Location"
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
