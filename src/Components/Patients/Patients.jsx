import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import { baseurl } from "../../Api/ApiData";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import { useSelector } from "react-redux";
import { getlogindata } from "../../Store/LoginReducer";
import { pagesid } from "../MultiComp/Utils";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";

export default function Patients() {
  const [PatientsList, setPatientsData] = useState(null);
  const navigate = useNavigate();

  const [MockData, setMockData] = useState(null);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [sorttype, setsorttype] = useState(null);

  const [loaderstate, setloaderstate] = useState(true);

  const [columns, setcolumns] = useState([
    { dataField: "patient_user_id", text: "Patient ID" },
    { dataField: "patient_name", text: "Name" },
    { dataField: "disease", text: "Disease" },
    { dataField: "last_visit_date", text: "Last Visit Date" },
    { dataField: "phone_number", text: "Phone Number" },
    {
      dataField: "",
      text: "",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div class="btn-group dropleft">
          {/* <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              <i class="fas fa-trash-alt"></i> Delete
            </a>
            <a class="dropdown-item" href="#">
              <i class="fas fa-download"></i> Download
            </a>
          </div> */}
        </div>
      ),
    },
    {
      dataField: "",
      text: "Show History",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div>
          {cell.patient_user_id !== "0" && (
            <button
              className="detail-btn"
              onClick={(e) => {
                navigate("/patientdetail", {
                  state: { id: cell.patient_user_id },
                });
                // setShow2(true);
                // togetPatientHistory(cell.phone_number);
              }}
            >
              View
            </button>
          )}
        </div>
      ),
    },
  ]);

  const [dummydata, setdummydata] = useState([null]);

  const rolesdataredux = useSelector(getlogindata);
  const [permisssion, setpermisssion] = useState(null);

  useEffect(() => {
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.patientlist
    );
    setpermisssion(tocheck[0].permissions);
    console.log("permissions", tocheck[0].permissions);
    if (tocheck.length > 0 && tocheck[0].permissions[0].status == true) {
      getPatientList();
    } else {
      navigate("/dashboard");
    }

    return () => {};
  }, []);

  async function getPatientList() {
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "post",
      url: baseurl + "ListofPatients",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);

        if (res.data.success == "true") {
          setdummydata(res.data.data.PatientsLists);
          setoptions({
            custom: true,
            totalSize: parseInt(res.data.data.PatientsLists.length),
          });
          setloaderstate(false);
        } else {
          swal(res.data.message);
          setloaderstate(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const sortArray = (type) => {
      if (type == "patient_user_id") {
        const dumm = [...dummydata].sort(function (a, b) {
          return a.patient_user_id - b.patient_user_id;
        });
        setdummydata(dumm);
      } else if (type == "patient_name") {
        const dumm2 = [...dummydata].sort(function (a, b) {
          var nameA = a.patient_name.toLowerCase(),
            nameB = b.patient_name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        setdummydata(dumm2);
      }
    };

    sortArray(sorttype);
  }, [sorttype]);

  // function getsortdata(type, data) {
  //   let dumm = [];
  //   console.log("type in getsortfunction", type);
  //   switch (type) {
  //     case "patient_user_id":
  //       console.log("id");
  //       dumm = data.sort(function (a, b) {
  //         return a.patient_user_id - b.patient_user_id;
  //       });
  //       return dumm;
  //       break;

  //     case "patient_name":
  //       dumm = data.sort(function (a, b) {
  //         var nameA = a.patient_name.toLowerCase(),
  //           nameB = b.patient_name.toLowerCase();
  //         if (nameA < nameB)
  //           //sort string ascending
  //           return -1;
  //         if (nameA > nameB) return 1;
  //         return 0; //default return value (no sorting)
  //       });
  //       return dumm;
  //       // console.log("checking", dd);
  //       break;

  //     default:
  //       dumm = data;
  //       return dumm;
  //       break;
  //   }
  // }

  // function getsortDataAll(data) {
  //   console.log("in the fucntion", data);
  //   let name = data.sort((a, b) => {
  //     var nameA = a.patient_name.toLowerCase(),
  //       nameB = b.patient_name.toLowerCase();
  //     if (nameA < nameB)
  //       //sort string ascending
  //       return -1;
  //     if (nameA > nameB) return 1;
  //     return 0; //default return value (no sorting)
  //   });
  //   let id = data.sort((a, b) => {
  //     return a.patient_user_id - b.patient_user_id;
  //   });
  //   setsortname(name);
  //   setsortid(id);
  //   console.log("new function", name, id);
  // }

  const handleOnSelect = (row, isSelect) => {
    if (isSelect && row.id < 3) {
      alert("Oops, You can not select Product ID which less than 3");
      return false; // return false to deny current select action
    }
    return true; // return true or dont return to approve current select action
  };

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      // return rows.filter((r) => r.id >= 3).map((r) => r.id);
      return rows;
    }
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: handleOnSelect(),
    onSelectAll: handleOnSelectAll(),
  };

  const [options, setoptions] = useState(null);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const [dummydatapatienthis, setdummydatapatienthis] = useState(null);
  const [optionpatienthis, setoptionpatienthis] = useState(null);
  const [columnhistory, setcolumnhistory] = useState([
    { dataField: "patient_user_id", text: "Patient ID" },
    { dataField: "Id", text: "ID" },
    { dataField: "patient_name", text: "Name" },
    { dataField: "gender", text: "Gender" },
    { dataField: "age", text: "Age" },
    { dataField: "disease", text: "Disease" },
    { dataField: "visit_date", text: "Last Visit Date" },
    {
      dataField: "",
      text: "",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div class="btn-group dropleft">
          {/* <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              <i class="fas fa-trash-alt"></i> Delete
            </a>
            <a class="dropdown-item" href="#">
              <i class="fas fa-download"></i> Download
            </a>
          </div> */}
        </div>
      ),
    },
    {
      dataField: "",
      text: "Detail",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div>
          {cell.prescription_id !== "0" && (
            <button
              className="detail-btn"
              onClick={(e) => {
                getPrescriptionData(cell.prescription_id);
                // setpresciptionData([]);
                setShow(true);
                // handleShow();
                // getPrescriptionData(cell.prescription_id);
                // setname(cell.patient_name);
              }}
            >
              View
            </button>
          )}
        </div>
      ),
    },
  ]);

  async function togetPatientHistory(phone) {
    var data = JSON.stringify({
      phone_number: phone,
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "post",
      url: baseurl + "GetPatientHistory",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        setloaderstate(false);
        console.log(res.data);
        let dd = res.data.data.PatientHistory;
        if (dd) {
          setdummydatapatienthis(res.data.data.PatientHistory);
          setoptionpatienthis({
            custom: true,
            totalSize: parseInt(dd.length),
          });
        } else {
          setdummydatapatienthis([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [name, setname] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [presciptionData, setpresciptionData] = useState(null);

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

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section">
          <div class="container">
            <div class="patient-listing">
              <Modal
                show={show2}
                onHide={handleClose2}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Body>
                  <div class="generic-table-holder">
                    {loaderstate ? (
                      <>
                        <section class="content-section">
                          <div className="gifloader">
                            <img src={spinnericon} alt="" />
                          </div>
                        </section>
                      </>
                    ) : (
                      <>
                        {dummydatapatienthis && optionpatienthis && (
                          <TableComp
                            keyfield="apointment_id"
                            data={dummydatapatienthis}
                            columns={columnhistory}
                            options={optionpatienthis}
                          />
                        )}
                      </>
                    )}
                  </div>
                </Modal.Body>
              </Modal>

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
                                  <span>{ent.disease.toUpperCase()}</span>
                                </h2>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Pills Name</th>
                                      <th>Days:</th>
                                      <th>
                                        {" "}
                                        <img src={moricon} alt="" /> Mor
                                      </th>
                                      <th>
                                        {" "}
                                        <img src={noonicon} alt="" /> Non
                                      </th>
                                      <th>
                                        {" "}
                                        <img src={eveicon} alt="" /> Eve
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
                                            <td>{pill.medicine}</td>
                                            <td>{pill.days}</td>
                                            <td>{pill.Morning} </td>
                                            <td>{pill.Afternoon} </td>
                                            <td>{pill.Evening}</td>
                                            <td>
                                              <label class="radio-holder">
                                                <input
                                                  type="radio"
                                                  //name="test"
                                                  class="prescription-check"
                                                  value="beforefood"
                                                  checked={pill.BeforeFood}
                                                  disabled={true}
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
                                                  checked={pill.WithFood}
                                                  disabled={true}
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
                                                  checked={pill.AfterFood}
                                                  disabled={true}
                                                />
                                                <span class="checkmark"></span>
                                              </label>
                                            </td>
                                            <td>Rs.{pill.amount}</td>
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
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6 text-right">
                  {permisssion && permisssion[1].status == true ? (
                    <button
                      class="btn btn-add-patient"
                      onClick={() => navigate("/addpatient")}
                    >
                      Add Patient
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="info-box">
                    <div class="text">
                      <h5>Total patient</h5>
                      <h3 class="numbers">150k</h3>
                    </div>
                    <div class="img-holder">
                      <img src="assets/images/total-patient-ic.png" alt="" />
                    </div>
                    <div class="percentage-holder mt-3 mt-lg-4">
                      <span class="percentage">+0.8%</span>
                      <span class="chart-holder">
                        <img src="assets/images/new-patient-chart.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6">
                  <div class="info-box1 info-box">
                    <div class="text">
                      <h5>Total patient</h5>
                      <h3 class="numbers">150k</h3>
                    </div>
                    <div class="img-holder">
                      <img src="assets/images/total-patient-ic.png" alt="" />
                    </div>
                    <div class="percentage-holder info-2 mt-3 mt-lg-4">
                      <span class="percentage">+0.8%</span>
                      <span class="chart-holder">
                        <img src="assets/images/footfall-chart.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6">
                  <div class="info-box last-info">
                    <div class="text">
                      <h5>Total patient</h5>
                      <h3 class="numbers">150k</h3>
                    </div>
                    <div class="img-holder">
                      <img src="assets/images/total-patient-ic.png" alt="" />
                    </div>

                    <div class="percentage-holder info-3 mt-3 mt-lg-4">
                      <span class="percentage">+0.8%</span>
                      <span class="chart-holder">
                        <img
                          src="assets/images/total-patient-chart.png"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="patients-info">
                    <div class="row mb-3">
                      <div class="col-md-12">
                        <h2 class="main-title">All Patients</h2>
                      </div>

                      {/* <div class="col-md-5 text-right sort-right">
                        <div class="form-group">
                          <label for="sort">Sort By:</label>
                          <select
                            name=""
                            id="sort"
                            class="custom-select"
                            value={sorttype}
                            onChange={(e) => setsorttype(e.target.value)}
                          >
                            <option value="all">Sort</option>
                            <option value="disease">Diagnosis</option>
                            <option value="patient_user_id">ID</option>
                            <option value="patient_name">Name</option>
                          </select>
                        </div>
                      </div> */}
                    </div>

                    <div class="table-holder">
                      {loaderstate ? (
                        <>
                          <section class="content-section">
                            <div className="gifloader">
                              <img src={spinnericon} alt="" />
                            </div>
                          </section>
                        </>
                      ) : (
                        <>
                          {dummydata && options && (
                            <TableComp
                              keyfield="patient_user_id"
                              data={dummydata}
                              columns={columns}
                              options={options}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
