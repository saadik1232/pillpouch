import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

import { baseurl } from "../../Api/ApiData";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { parseInt } from "lodash";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import { getlogindata } from "../../Store/LoginReducer";
import { useSelector } from "react-redux";
import { pagesid } from "../MultiComp/Utils";

export default function UploadedPresc() {
  const [AppointmentData, setAppointmentData] = useState([
    // { phone_number: "03089134330", prescription_no: "UP20220418154B" },
    // { phone_number: "03089134331", prescription_no: "UP20220418154B" },
    // { phone_number: "03089134332", prescription_no: "UP20220418154B" },
  ]);
  const [columns, setcolumns] = useState([
    {
      dataField: "prescription_no",
      text: "Prescription",
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
    { dataField: "phone_number", text: "Phone Number", sort: true },
    {
      dataField: "",
      text: "Images",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div>
          {cell.images.map((ent) => {
            return (
              <>
                {" "}
                <a className="url_anchor" href={ent.image_path} target="_blank">
                  {" "}
                  {ent.image_path} <br />
                </a>
              </>
            );
          })}
        </div>
      ),
    },
    {
      dataField: "",
      text: "Set Status",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div className="text-left">
          <button
            type="button"
            class="btn create-btn"
            onClick={(e) => {
              console.log("test", cell);
              deleteFunction(cell);
            }}
          >
            {" "}
            Change Status{" "}
          </button>
        </div>
      ),
    },
  ]);
  const [statuslist, setstatuslist] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);

  const [options, setoptions] = useState(null);

  const navigate = useNavigate();

  function deleteFunction(cell) {
    console.log("cell info", cell);
    swal("Are you sure, you want to change status?", {
      buttons: {
        Yes: "Yes",
        No: {
          text: "No",
          value: "No",
        },
      },
    }).then((value) => {
      switch (value) {
        case "Yes":
          CreatePouchApi(cell);
          break;

        case "catch":
          break;

        default:
          break;
      }
    });
  }

  async function CreatePouchApi(cell) {
    setloaderstate(true);
    console.log("data in fucn", cell);
    var data = JSON.stringify({
      prescription_no: cell.prescription_no,
    });

    var config = {
      method: "post",
      url: baseurl + "PouchCreated",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        setloaderstate(false);
        console.log(res.data);
        swal(res.data.message).then(() => {
          getAppointments();
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const rolesdataredux = useSelector(getlogindata);
  const [permisssion, setpermisssion] = useState(null);

  useEffect(() => {
    //getstatuslist();
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.uploadprescription
    );
    setpermisssion(tocheck[0].permissions);
    if (tocheck.length > 0 && tocheck[0].permissions[0].status == true) {
      getAppointments();
    } else {
      navigate("/dashboard");
    }
  }, []);

  async function getAppointments() {
    setloaderstate(true);

    var config = {
      method: "Get",
      url: baseurl + "ListofUploadedPrescriptions",
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
        console.log(response.data.data.prescriptions);
        setAppointmentData(response.data.data.prescriptions);
        setloaderstate(false);
        setoptions({
          custom: true,
          totalSize: parseInt(response.data.data.prescriptions.length),
        });
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
                            <h2 class="main-title">Uploaded Prescriptions</h2>
                          </div>
                        </div>
                        <div id="table-holder" className="uploadedprescription">
                          {AppointmentData && options && (
                            <TableComp
                              keyfield="prescription_no"
                              data={AppointmentData}
                              columns={columns}
                              options={options}
                              placeholertext={
                                "Search by Prescription, Phone number"
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
