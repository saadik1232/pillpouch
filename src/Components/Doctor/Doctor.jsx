import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

import { baseurl } from "../../Api/ApiData";

import swal from "sweetalert";
import newappoint from "../../assets/images/newappoint.png";
import totalappoint from "../../assets/images/total-appoint.png";
import completeappoint from "../../assets/images/complete-appoint.png";
import { useNavigate } from "react-router-dom";
import { parseInt } from "lodash";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import { useSelector } from "react-redux";
import { getlogindata } from "../../Store/LoginReducer";
import { pagesid } from "../MultiComp/Utils";

export default function Doctor() {
  const [AppointmentData, setAppointmentData] = useState([
    {
      apointment_id: "1",
      apointment_time: "13:00:00",
      apointment_date: "24/12/2021",
      patient_name: "Imran",
      location: "",
      apointment_status: "Accepted",
    },
    {
      apointment_id: "2",
      apointment_time: "16:00:00",
      apointment_date: "24/12/2021",
      patient_name: "ahsan",
      location: "",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "3",
      apointment_time: "13:00:00",
      apointment_date: "29/12/2021",
      patient_name: "Imran",
      location: "",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "4",
      apointment_time: "13:00:00",
      apointment_date: "31/12/2021",
      patient_name: "ahsan",
      location: "",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "5",
      apointment_time: "13:00:00",
      apointment_date: "24/12/2021",
      patient_name: "Imran",
      location: "",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "6",
      apointment_time: "13:00:00",
      apointment_date: "26/12/2021",
      patient_name: "ahsan",
      location: "",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "7",
      apointment_time: "11:00:00",
      apointment_date: "18/01/2022",
      patient_name: "Imran",
      location: "Lahore",
      apointment_status: "Confirmed",
    },
    {
      apointment_id: "9",
      apointment_time: "11:00:00",
      apointment_date: "18/01/2022",
      patient_name: "ahsan",
      location: "Lahore",
      apointment_status: "Confirmed",
    },
  ]);
  const [columns, setcolumns] = useState(null);
  const [statuslist, setstatuslist] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);

  const [statusid, setstatusid] = useState(null);
  const [userid, setuserid] = useState(20);
  const [appointmentid, setappointmentid] = useState(null);

  const [options, setoptions] = useState(null);

  const navigate = useNavigate();

  const [permisssion, setpermisssion] = useState(null);
  const rolesdataredux = useSelector(getlogindata);

  useEffect(() => {
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.doctorList
    );
    setpermisssion(tocheck[0].permissions);
    if (tocheck.length > 0 && tocheck[0].permissions[0].status == true) {
      getAppointments();
      getstatuslist(tocheck[0].permissions);
    } else {
      navigate("/dashboard");
    }
  }, []);

  async function getAppointments() {
    setloaderstate(true);

    var config = {
      method: "Get",
      url: baseurl + "ListofDoctors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      },
    };
    //return axios(config);
    await axios(config)
      .then(function (response) {
        setloaderstate(false);
        console.log(response.data.data.Doctors);
        setAppointmentData(response.data.data.Doctors);
        setloaderstate(false);
        setoptions({
          custom: true,
          totalSize: parseInt(response.data.data.Doctors.length),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getstatuslist(per) {
    var config = {
      method: "get",
      url: baseurl + "ListofDoctorStatuses",
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data.statuses);
        let statusdata = response.data.data.statuses;

        setcolumns([
          {
            dataField: "doctor_id",
            text: "ID",
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
            sortFunc: (a, b, order, dataField) => {
              if (order === "asc") {
                return a - b;
              }
              return b - a; // desc
            },
          },
          {
            dataField: "doctor_name",
            text: "Name",
            sort: true,
            // events: {
            //   onClick: (e, column, columnIndex, row, rowIndex) => {
            //     console.log(row);
            //     // navigate('/doctorprofile')
            //     navigate("/doctorprofile", { state: { id: row.doctor_id } });
            //   },
            // },
          },
          {
            dataField: "specialization",
            text: "Specialization",
            classes: "boldname",
            sort: true,
          },
          { dataField: "registration_number", text: "Registration Number" },
          {
            dataField: "email",
            text: "Email",
          },
          {
            dataField: "phone_number",
            text: "Phone Number",
          },
          {
            dataField: "doctor_status",
            text: "Status",
            classes: (cell, row, rowIndex, colIndex) => {
              if (row.doctor_status == "Approved") {
                return "demo-row-accepted";
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
                  <>
                    <div class="btn-group dropleft colorfulbtn">
                      <button
                        type="button"
                        class="btn btn-secondary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                      <div class="dropdown-menu">
                        <div
                          class="dropdown-item confirm-appoint"
                          onClick={(e) => {
                            changestatusapi(
                              response.data.data.statuses[0].doctor_status_id,
                              cell.doctor_id
                            );
                          }}
                        >
                          <i class="fas fa-check-circle"></i>{" "}
                          {response.data.data.statuses[0].description}
                        </div>
                        <div
                          class="dropdown-item accept-appoint"
                          onClick={(e) => {
                            changestatusapi(
                              response.data.data.statuses[1].doctor_status_id,
                              cell.doctor_id
                            );
                          }}
                        >
                          <i class="far fa-check-circle"></i>{" "}
                          {response.data.data.statuses[1].description}
                        </div>
                      </div>
                    </div>

                    {/* <div className="edit-btn btn-lite mr-2"> */}
                    <i
                      class="fas fa-pencil-alt ml-3"
                      onClick={(e) => {
                        console.log("test", cell);
                        navigate("/doctorprofile", {
                          state: { editdocope: true, doctorid: cell.doctor_id },
                        });
                      }}
                    ></i>
                    {/* </div> */}
                  </>
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
      doctor_id: appid,
      user_id: localStorage.getItem("userid"),
      doctor_status_id: statusid,
    });

    var config = {
      method: "post",
      url: baseurl + "ChangeDoctorStatus",
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

  const selectRow = {
    mode: "checkbox",
    //clickToSelect: true,
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        //setSelectedLoan(rows);
      } else {
        //setSelectedLoan([]);
      }
    },
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        //setSelectedLoan((prevState) => [...prevState, row.Loan_ID]);
      } else {
        //setSelectedLoan(selectedLoad.filter((x) => x !== row.Loan_ID));
      }
    },
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
    },
  };

  function gotoAddApp() {
    navigate("/doctorprofile");
  }

  //const [options, setoptions] = useState(null);

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
                <div class="patient-listing">
                  <div class="row mt-4">
                    <div class="col-md-12">
                      <div class="patients-info">
                        <div className="row mb-5">
                          <div class="col-md-8">
                            <h2 class="main-title">Doctors</h2>
                          </div>
                          <div class="col-md-4 text-right">
                            {permisssion[1].status == true && (
                              <button
                                onClick={gotoAddApp}
                                class="btn btn-add-patient"
                              >
                                Add Doctor
                              </button>
                            )}
                          </div>
                        </div>
                        <div id="table-holder">
                          {statuslist && AppointmentData && options && (
                            <TableComp
                              keyfield="doctor_id"
                              data={AppointmentData}
                              columns={columns}
                              options={options}
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
