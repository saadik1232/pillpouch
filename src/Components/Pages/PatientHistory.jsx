import axios from "axios";
import React, { useState } from "react";
import { baseurl } from "../../Api/ApiData";
import TopNav from "../Header/TopNav";
import { Modal } from "react-bootstrap";
import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";
import spinnericon from "../../assets/images/spinner.gif";

import TableComp from "../MultiComp/TableComp";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function PatientHistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [columns, setcolumns] = useState([
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
        <div class="btn-group dropleft"></div>
      ),
    },
    {
      dataField: "",
      text: "Detail",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div>
          {cell.prescription_id !== "0" && (
            <button
              className="btn btn-view-pre"
              onClick={(e) => {
                getPrescriptionData(cell.prescription_id);
                setpresciptionData([]);
                setShow(true);
                // handleShow();
                // getPrescriptionData(cell.prescription_id);
                // setname(cell.patient_name);
              }}
            >
              View Prescription
            </button>
          )}
        </div>
      ),
    },
  ]);
  const [dummydata, setdummydata] = useState(null);

  const [options, setoptions] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [presciptionData, setpresciptionData] = useState(null);
  const [patienthistory, setpatienthistory] = useState(null);

  const [name, setname] = useState("");
  const [loaderstate, setloaderstate] = useState(true);
  const [toviewtablestate, settoviewtablestate] = useState(false);

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

  useEffect(() => {
    console.log("the state in patient history is", location.state);
    tocheckhistory(location.state.phone_number);
    return () => {};
  }, []);

  async function tocheckhistory(phone) {
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
        //swal(res.data.message);
        if (dd) {
          settoviewtablestate(true);
          setpatienthistory(res.data.data.PatientHistory);
          setdummydata(res.data.data.PatientHistory);
          setoptions({
            custom: true,
            totalSize: parseInt(dd.length),
          });
        } else {
          settoviewtablestate(false);
          setpatienthistory([]);
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
        <section class="content-section">
          <div class="container">
            <div class="patient-listing">
              <div className="row">
                <div className="col-md-6">
                <button
                    className="btn btn-add-patient"
                    onClick={() => {
                      navigate("/addappointmentsnew", {
                        state: {
                          phone_number: location.state.phone_number,
                        },
                      });
                    }}
                  >
                    Go Back
                  </button>
                </div>
                <div className="col-md-6 text-right">
                </div>
              </div>
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

              {toviewtablestate == true ? (
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="patients-info">
                      <div class="row mb-3">
                        <div class="col-md-7">
                          <h2 class="main-title">Patient History</h2>
                        </div>
                      </div>

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
                            <div id="table-holder">
                              <TableComp
                                keyfield="apointment_id"
                                data={dummydata}
                                columns={columns}
                                options={options}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <section class="content-section">
                    <div className="gifloader">
                      <img src={spinnericon} alt="" />
                    </div>
                  </section>{" "}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
