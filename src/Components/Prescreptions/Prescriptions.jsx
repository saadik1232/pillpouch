import React, { useEffect, useState } from "react";

import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

import { baseurl } from "../../Api/ApiData";
import spinnericon from "../../assets/images/spinner.gif";
import swal from "sweetalert";
import axios from "axios";

import BootstrapTable from "react-bootstrap-table-next";
import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getlogindata } from "../../Store/LoginReducer";
import { pagesid } from "../MultiComp/Utils";

export default function Prescriptions() {
  const [prescriptionsData, setprescriptions] = useState(null);

  const { SearchBar } = Search;
  const navigate = useNavigate();

  const [options, setoptions] = useState(null);

  const [columns, setcolumns] = useState(null);
  const [statuslist, setstatuslist] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);

  const [statusid, setstatusid] = useState(null);
  const [userid, setuserid] = useState(20);
  const [prescriptionId, setprescriptionId] = useState(null);
  const [presciptionData, setpresciptionData] = useState(null);
  const [name, setname] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rolesdataredux = useSelector(getlogindata);
  const [permisssion, setpermisssion] = useState(null);

  useEffect(() => {
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.order_pageid
    );
    setpermisssion(tocheck[0].permissions);
    if (tocheck.length > 0 && tocheck[0].permissions[0].status == true) {
      getPrescriptions();
      listofstatus(tocheck[0].permissions);
    } else {
      navigate("/dashboard");
    }
  }, []);

  async function getPrescriptions() {
    setloaderstate(true);
    var config = {
      method: "get",
      url: baseurl + "ListofPrescriptions",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.prescriptions);
        setloaderstate(false);
        setprescriptions(res.data.data.prescriptions);
        setoptions({
          custom: true,
          totalSize: parseInt(res.data.data.prescriptions.length),
        });
      })
      .catch(function (error) {
        //setloaderstate(false);
        console.log(error);
      });
  }

  function priceFormatter(cell, row) {
    return <span className={cell}> {cell}</span>;
  }

  async function listofstatus(per) {
    var config = {
      method: "get",
      url: baseurl + "ListofPrescriptionStatuses",
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data.statuses);
        setcolumns([
          {
            dataField: "prescription_id",
            text: "ID",
            sort: true,
            sortFunc: (a, b, order, dataField) => {
              if (order === "asc") {
                return a - b;
              }
              return b - a; // desc
            },
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
          {
            dataField: "prescription_no",
            text: "Number",
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
          {
            dataField: "patient_name",
            text: "Name",
            classes: "boldname",
          },
          {
            dataField: "prescription_status",
            text: "Status",
            // classes: (cell, row, rowIndex, colIndex) => {
            //   return row.prescription_status;
            // },
            // classes: "helo",
            formatter: priceFormatter,
          },
          { dataField: "amount", text: "Amount" },

          per[2].status == true
            ? {
                dataField: "",
                text: "Set Status",
                formatter: (e, cell, row, rowIndex, extraData) => (
                  <div className="selectouter">
                    <select
                      onChange={(e) => {
                        setstatusid(parseInt(e.target.value));
                        setprescriptionId(parseInt(cell.prescription_id));
                        localStorage.setItem("statusid", e.target.value);
                        localStorage.setItem("appid", cell.prescription_id);
                      }}
                    >
                      <option> Select Status </option>
                      {response.data.data.statuses.map((ent) => (
                        <option value={ent.prescription_status_id}>
                          {ent.description}
                        </option>
                      ))}
                    </select>
                    <button
                      className="setbtn"
                      onClick={(e) => changestatusapi()}
                    >
                      Save
                    </button>
                  </div>
                ),
              }
            : {},
          {
            dataField: "",
            text: "Detail",
            formatter: (e, cell, row, rowIndex, extraData) => (
              <div>
                <button
                  className="detail-btn"
                  onClick={(e) => {
                    handleShow();
                    getPrescriptionData(cell.prescription_id);
                    setname(cell.patient_name);
                  }}
                >
                  View
                </button>
              </div>
            ),
          },
        ]);
        setstatuslist(response.data.data.statuses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function changestatusapi() {
    let statusid = localStorage.getItem("statusid");
    let appid = localStorage.getItem("appid");
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
      prescription_id: appid,
      prescription_status_id: statusid,
      user_id: "12",
    });

    var config = {
      method: "post",
      url: baseurl + "ChangePrescriptionStatus",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res);
        swal(res.data.message).then(() => {
          if (res.data.success == "true") {
            getPrescriptions();
          }
        });
      })
      .catch(function (error) {
        console.log("test", error);
      });
  }

  async function getPrescriptionData(id) {
    var data = JSON.stringify({
      prescription_id: id,
    });

    var config = {
      method: "post",
      url: baseurl + "PrescriptionDetail",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.order_detail);
        if (res.data.code == "200") {
          setpresciptionData(res.data.data.order_detail);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const selectoption = (
    <select
      name=""
      id="sort"
      class="custom-select"
      onChange={(e) => {
        console.log("test");
        setsearchvalue(e.target.value);
        let data = [...presciptionData];
        setpresciptionData(data);
      }}
    >
      <option value="">All</option>
      <option value="Accepted">Accepted</option>
      <option value="InProcess">InProcess</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );

  function gotoAdd() {
    navigate("/addpatient");
  }

  const [searchvalue, setsearchvalue] = useState("");

  const MySearch = (props) => {
    let input;
    const handleClick = (val) => {
      props.onSearch(val);
    };
    return (
      <select
        name=""
        id="sort"
        class="custom-select"
        onChange={(e) => {
          handleClick(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="Accepted">Accepted</option>
        <option value="Placed">Placed</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    );
  };

  return (
    <>
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
            {statuslist && prescriptionsData && (
              <>
                {/* <h1>Appointments</h1> */}
                <div class="container">
                  <div class="patient-listing">
                    <div class="row mt-4">
                      <div class="col-md-12">
                        <div class="patients-info">
                          <div className="row">
                            <div class="col-md-7">
                              <h2 class="main-title mb-4">Prescriptions</h2>
                            </div>
                            <div class="col-md-5 text-right">
                              {permisssion[1].status == true && (
                                <button
                                  onClick={gotoAdd}
                                  class="btn btn-add-patient"
                                >
                                  Add Prescriptions
                                </button>
                              )}
                            </div>
                          </div>

                          {statuslist && prescriptionsData && options && (
                            <>
                              <PaginationProvider
                                pagination={paginationFactory(options)}
                              >
                                {({
                                  paginationProps,
                                  paginationTableProps,
                                }) => (
                                  <div>
                                    <ToolkitProvider
                                      keyField="prescription_id"
                                      columns={columns}
                                      data={prescriptionsData}
                                      //search
                                      search={{ defaultSearch: searchvalue }}
                                    >
                                      {(toolkitprops) => (
                                        <>
                                          <div class="row mb-3">
                                            <div className="col-md-6">
                                              <div className="form-group">
                                                <SearchBar
                                                  {...toolkitprops.searchProps}
                                                  className="form-control search-prescription"
                                                  style={{ width: "500px" }}
                                                  placeholder="Search by name, ID, Number, Status ..."
                                                  //value={"accepted"}
                                                />
                                              </div>
                                            </div>
                                            <div class="col-md-6 text-right sort-right">
                                              <div class="form-group">
                                                <label for="sort">
                                                  Status By:
                                                </label>
                                                {/* {selectoption} */}
                                                <MySearch
                                                  {...toolkitprops.searchProps}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            id="table-holder"
                                            className="prescriptiontable"
                                          >
                                            <BootstrapTable
                                              {...toolkitprops.baseProps}
                                              {...paginationTableProps}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </ToolkitProvider>

                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                )}
                              </PaginationProvider>

                              <Modal
                                show={show}
                                onHide={handleClose}
                                size="xl"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                              >
                                {/* <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                  </Modal.Header> */}
                                <Modal.Body>
                                  <div className="prescription-info">
                                    <h2 className="patient-name">
                                      {name}
                                      <span>ID: 8796</span>
                                    </h2>
                                    <h3>Prescription</h3>
                                    <div className="table-holder timing-table">
                                      {presciptionData && (
                                        <>
                                          {presciptionData.map((ent) => {
                                            return (
                                              <>
                                                <h2 className="patient-name m-0">
                                                  <span>
                                                    {ent.disease.toUpperCase()}
                                                  </span>
                                                </h2>
                                                <table className="table">
                                                  <thead>
                                                    <tr>
                                                      <th>Pills Name</th>
                                                      <th>Days:</th>
                                                      <th>
                                                        {" "}
                                                        <img
                                                          src={moricon}
                                                          alt=""
                                                        />{" "}
                                                        Mor
                                                      </th>
                                                      <th>
                                                        {" "}
                                                        <img
                                                          src={noonicon}
                                                          alt=""
                                                        />{" "}
                                                        Non
                                                      </th>
                                                      <th>
                                                        {" "}
                                                        <img
                                                          src={eveicon}
                                                          alt=""
                                                        />{" "}
                                                        Eve
                                                      </th>
                                                      <th>
                                                        Before <br /> Food
                                                      </th>
                                                      <th>
                                                        With
                                                        <br /> Food
                                                      </th>
                                                      <th>
                                                        After
                                                        <br /> Food
                                                      </th>
                                                      <th>Price</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {ent.pills.map((pill) => {
                                                      return (
                                                        <>
                                                          <tr>
                                                            <td>
                                                              {pill.medicine}
                                                            </td>
                                                            <td>{pill.days}</td>
                                                            <td>
                                                              {pill.Morning}{" "}
                                                            </td>
                                                            <td>
                                                              {pill.Afternoon}{" "}
                                                            </td>
                                                            <td>
                                                              {pill.Evening}
                                                            </td>
                                                            <td>
                                                              <label class="radio-holder">
                                                                <input
                                                                  type="radio"
                                                                  //name="test"
                                                                  class="prescription-check"
                                                                  value="beforefood"
                                                                  checked={
                                                                    pill.BeforeFood
                                                                  }
                                                                  disabled={
                                                                    true
                                                                  }
                                                                />
                                                                <span class="checkmark"></span>
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label class="radio-holder">
                                                                <input
                                                                  type="radio"
                                                                  //name="test"
                                                                  class="prescription-check"
                                                                  value="beforefood"
                                                                  checked={
                                                                    pill.WithFood
                                                                  }
                                                                  disabled={
                                                                    true
                                                                  }
                                                                />
                                                                <span class="checkmark"></span>
                                                              </label>
                                                            </td>
                                                            <td>
                                                              <label class="radio-holder">
                                                                <input
                                                                  type="radio"
                                                                  //name="test"
                                                                  class="prescription-check"
                                                                  value="beforefood"
                                                                  checked={
                                                                    pill.AfterFood
                                                                  }
                                                                  disabled={
                                                                    true
                                                                  }
                                                                />
                                                                <span class="checkmark"></span>
                                                              </label>
                                                            </td>
                                                            <td>
                                                              Rs.{pill.amount}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      );
                                                    })}
                                                  </tbody>
                                                </table>
                                              </>
                                            );
                                          })}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </Modal.Body>
                                {/* <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={handleClose}
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer> */}
                              </Modal>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
