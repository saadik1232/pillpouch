import axios from "axios";
import React, { useEffect, useState } from "react";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import { baseurl } from "../../Api/ApiData";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory, {
//   PaginationProvider,
//   PaginationListStandalone,
// } from "react-bootstrap-table2-paginator";
import { sortBy } from "lodash";
import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import Select2 from "react-select";
//import Select from "react-select-virtualized";
import Select from "react-select-virtualized";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import swal from "sweetalert";
import { formatDate } from "../MultiComp/Utils";
import DateComp from "../MultiComp/DateComp";
import TimeComp from "../MultiComp/TimeComp";

export default function Patients() {
  const [dateformated, setdateformated] = useState(null);
  const [timeformated, settimeformated] = useState(null);

  const [loaderstate, setloaderstate] = useState(false);
  const [toshowData, settoshowData] = useState(true);
  const [diseasesdata, setdiseasesdata] = useState([]);
  const [medicines, setmedicines] = useState(null);
  const [Diseases, setDiseases] = useState([]);
  const [options, setoptions] = useState([null]);

  const [patientName, setpatientName] = useState(null);
  const [sex, setsex] = useState(null);
  const [age, setage] = useState(null);
  const [address, setaddress] = useState(null);
  const [phone, setphone] = useState(null);
  const [visitdata, setvisitdata] = useState(null);
  const [shippingaddressid, setshippingaddressid] = useState(null);

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("the state is with patient id", state);
    togetDropDownData();
    getpatientdetails();
    return () => {};
  }, []);

  async function getpatientdetails() {
    var data = JSON.stringify({
      patient_id: state.id,
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "post",
      url: baseurl + "PatientDetail",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data);
        let dd = res.data.data;
        setpatientName(dd.patient_name);
        setage(dd.age);
        setsex(dd.gender);
        setaddress(dd.shipping_address);
        setphone(dd.phone_number);
        setvisitdata(dd.last_visited_date);
        setshippingaddressid(dd.shipping_address_id);
        setoptionpatienthis({
          custom: true,
          totalSize: parseInt(dd.OldPrescriptions.length),
        });

        setdummydatapatienthis(dd.OldPrescriptions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function togetDropDownData(params) {
    var config = {
      method: "get",
      url: baseurl + "GetAllDropdowns",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        //console.log(res.data.data);
        let medi = [];
        for (let i = 0; i < res.data.data.medicines.length; i++) {
          const ele = {
            value: res.data.data.medicines[i].medicine_id,
            label: res.data.data.medicines[i].description,
            price: res.data.data.medicines[i].price,
          };
          medi.push(ele);
        }
        let des = [];

        for (let j = 0; j < res.data.data.diseases.length; j++) {
          const element = {
            value: res.data.data.diseases[j].disease_id,
            label: res.data.data.diseases[j].description,
          };
          des.push(element);
        }

        //console.log("medi", medi);
        setmedicines(medi);
        setoptions(des);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [dummydatapatienthis, setdummydatapatienthis] = useState([]);
  const [optionpatienthis, setoptionpatienthis] = useState(null);
  const [columnhistory, setcolumnhistory] = useState([
    { dataField: "prescription_id", text: "Prescription ID" },
    { dataField: "prescription_no", text: "Prescription No" },
    { dataField: "patient_name", text: "Name" },
    { dataField: "prescription_status", text: "Status" },
    { dataField: "amount", text: "Amount" },
    // { dataField: "disease", text: "Disease" },
    // { dataField: "visit_date", text: "Last Visit Date" },
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
                setShow(true);
                setpresciptionData([]);
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

  function removePill(innerindex, outerindex2) {
    //console.log(innerindex, outerindex2);
    let dum = [...Diseases];
    delete dum[outerindex2].pills[innerindex];
    //console.log(dum);
    setDiseases(dum);
  }

  function toselectfunction(value2) {
    let prevArr = [];
    let value = [];

    for (let i = 0; i < Diseases.length; i++) {
      let element = Diseases[i].disease;
      prevArr.push(element);
    }

    for (let i = 0; i < value2.length; i++) {
      let element = value2[i].label;
      value.push(element);
    }

    // console.log("value", value);
    // console.log("prevArr", prevArr);

    if (value.length > prevArr.length) {
      // console.log("great");
      // console.log("diff", value.diff(prevArr));
      let addDum = [...Diseases];
      let toadd = value.diff(prevArr);
      let togetid = options.find((item) => {
        return item.label == toadd[0];
      });
      //console.log("toaddd", toadd);

      let ele = {
        disease: toadd[0],
        diseaseid: togetid.value,
        pills: [
          {
            pillsname: "1",
            pillvalue: "",
            days: "5",
            time: "",
            Food: "",
            price: "",
            mornpills: 0,
            nonpills: 0,
            evenpill: 0,
            timetotake: "", // also add in add prescription and in the select function
          },
        ],
      };
      addDum.push(ele);
      setDiseases(addDum);
      setdiseasesdata(addDum);
    } else if (value.length < prevArr.length) {
      // console.log("less");
      // console.log(
      //   "diff",
      //   value.filter((x) => !prevArr.includes(x))
      // );
      if (value.length == 0) {
        setDiseases([]);
      } else {
        let removeName = prevArr.diff(value);
        let dum = [...Diseases];
        //console.log("this is remove name", removeName[0]);
        var newArray = dum.filter(function (el) {
          return el.disease !== removeName[0];
        });
        setDiseases(newArray);
        //console.log("data removed", newArray);
      }
    }
    // else if (value.length == 0) {
    //   setdiseasesdata([]);
    // }
  }

  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };

  function addprescription(index2) {
    let dum = [...Diseases];
    let ent = {
      pillsname: "1",
      pillvalue: "",
      days: "5",
      time: "",
      Food: "",
      price: "",
      mornpills: 0,
      nonpills: 0,
      evenpill: 0,
      timetotake: "", // also add in add prescription and in the select function
    };
    dum[index2].pills.push(ent);
    setDiseases(dum);
  }

  function selectOnchange(val, index, outerindex) {
    //console.log("value and index", val, index);
    let dum = [...Diseases];
    dum[outerindex].pills[index].pillsname = val.value;
    dum[outerindex].pills[index].price = val.price;
    //console.log(dum);
    setDiseases(dum);
  }

  function howmanyInc(innerindex, outerindex2) {
    //console.log(innerindex, outerindex2);
    //console.log(Diseases[outerindex2]);
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    incr.days++;
    dum[outerindex2].pills[innerindex] = incr;
    //console.log("new data", dum);
    setDiseases(dum);
  }

  function howmanyDec(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    if (incr.days != 0) {
      incr.days--;
    }

    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function morninInc(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    let sum = parseFloat(incr.mornpills) + 0.5;
    incr.mornpills = sum;
    //incr.mornpills = parseInt(incr.mornpills) + 0.5;
    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function morninDec(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    //incr.mornpills--;
    if (incr.mornpills != 0) {
      let sum = parseFloat(incr.mornpills) - 0.5;
      incr.mornpills = sum;
    }
    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function noonInc(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    let sum = parseFloat(incr.nonpills) + 0.5;
    incr.nonpills = sum;

    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function noonDec(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    if (incr.nonpills != 0) {
      let sum = parseFloat(incr.nonpills) - 0.5;
      incr.nonpills = sum;
    }
    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function EveInc(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];

    let sum = parseFloat(incr.evenpill) + 0.5;
    incr.evenpill = sum;
    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function EveDec(innerindex, outerindex2) {
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    if (incr.evenpill != 0) {
      let sum = parseFloat(incr.evenpill) - 0.5;
      incr.evenpill = sum;
    }
    dum[outerindex2].pills[innerindex] = incr;
    setDiseases(dum);
  }

  function tosettime(innerindex, outerindex2, name) {
    //console.log("test");
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    incr.timetotake = name;
    dum[outerindex2].pills[innerindex] = incr;
    //console.log("dum", dum);
    setDiseases(dum);
  }

  function toshowPrescriptions(val) {
    //console.log(val);
    if (val == true) {
      settoshowData(true);
    } else {
      settoshowData(false);
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [presciptionData, setpresciptionData] = useState(null);

  const [name, setname] = useState("");

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

  const [toshowdatetime, settoshowdatetime] = useState(false);

  async function AddPresciptionApi() {
    let prescription_detail = [];

    Diseases.map((ent, index1) => {
      ent.pills.map((ent2, index2) => {
        let ele = {
          medicine_id: ent2.pillsname,
          disease_id: ent.diseaseid,
          days: ent2.days,
          times: [
            {
              id: "1", // morning
              qty: ent2.mornpills,
            },
            {
              id: "2", // afternoon
              qty: ent2.nonpills,
            },
            {
              id: "3", // evening
              qty: ent2.evenpill,
            },
          ],
          when_to_take: ent2.timetotake,
        };
        prescription_detail.push(ele);
      });
    });

    var data = JSON.stringify({
      patient_name: patientName,
      phone_number: phone,
      gender: sex,
      age: age,
      city_id: "1",
      shipping_address_id: shippingaddressid,
      shipping_address: address,
      next_visit_date: dateformated,
      next_visit_time: timeformated,
      user_id: localStorage.getItem("userid"),
      prescription_date: formatDate(new Date()),
      prescription_detail: prescription_detail,
    });

    var config = {
      method: "post",
      url: baseurl + "AddPatient",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if (res.data.success == "true") {
          if (localStorage.getItem("usertype_id") == "2") {
            swal(res.data.message).then(() => navigate("/patientlist"));
          } else {
            swal(res.data.message).then(() => navigate("/prescriptions"));
          }
        } else {
          swal(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function gobackFunction() {
    if (state.fromdashboard) {
      navigate("/dashboard", {
        state: {
          viewdata: state.fromdashboard,
        },
      });
    } else {
      navigate("/patientlist");
    }
  }

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section patient-details">
          <div class="container">
            <div class="details-hold">
              <div class="row justify-content-center">
                <div class="col-md-12 mb-5">
                  <h2 class="main-title">Patient Details</h2>
                </div>
                <div class="col-lg-9 col-md-12 pt-lg-5 pt-4">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <div class="title-box">
                        <h2 class="name">{patientName}</h2>
                        <h4 class="disease">
                          {/* Diabeties */}
                          <span class="time ml-3">
                            {/* Lastest Diagonsis */}
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div class="col-md-6 text-right">
                      <div class="btn-holder">
                        <div
                          //onClick={() => navigate("/patientlist")}
                          onClick={gobackFunction}
                          class="btn-back btn ml-3"
                        >
                          Go Back
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row info">
                    <div class="col-md-12">
                      <h3 class="info-title">Patient General information</h3>

                      <table class="table table-information">
                        <tr>
                          <td>Name</td>
                          <td>{patientName}</td>
                        </tr>
                        <tr>
                          <td>Mobile Number</td>
                          <td>{phone}</td>
                        </tr>
                        <tr>
                          <td>Age</td>
                          <td>{age}</td>
                        </tr>
                        <tr>
                          <td>Sex</td>
                          <td>{sex}</td>
                        </tr>
                        <tr>
                          <td>Visit Date</td>
                          <td>{visitdata}</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>{address}</td>
                        </tr>
                      </table>
                      <h3 class="info-title my-4 my-lg-5">Patient History</h3>
                    </div>
                    <div className="col-md-12">
                      <div className="table-holder timing-table">
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
                                  keyfield="prescription_id"
                                  data={dummydatapatienthis}
                                  columns={columnhistory}
                                  options={optionpatienthis}
                                />
                              )}
                            </>
                          )}
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
                                <span></span>
                              </h2>
                              <h3>Prescription</h3>
                              <div className="table-holder timing-table">
                                {presciptionData && (
                                  <>
                                    {presciptionData.map((ent, index) => {
                                      return (
                                        <div key={index}>
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
                                              {ent.pills.map((pill, index2) => {
                                                return (
                                                  <>
                                                    <tr key={index2}>
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
                                                            checked={
                                                              pill.BeforeFood
                                                            }
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
                                                            checked={
                                                              pill.WithFood
                                                            }
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
                                                            checked={
                                                              pill.AfterFood
                                                            }
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
                                        </div>
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

                        {/* <table className="table">
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
                          <tr>
                            <td>Veldomet 500mg</td>
                            <td>15</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>Rs.480</td>
                          </tr>
                          <tr>
                            <td>Veldomet 500mg</td>
                            <td>15</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test2"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test2"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>
                              <label class="radio-holder">
                                <input
                                  type="radio"
                                  name="test2"
                                  class="prescription-check"
                                  value="beforefood"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </td>
                            <td>Rs.480</td>
                          </tr>
                        </table> */}
                      </div>
                    </div>
                    {/* <div class="col">
                      <h4 class="prescription-head">Disease</h4>
                    </div> */}
                    {/* <div class="col text-right">
                      <h4 class="prescription-head mr-5">Diabeties</h4>
                    </div> */}
                    {/* <div class="col-md-12 mt-4">
                      <div id="accordion">
                        <div class="card">
                          <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                              <button
                                class="btn-link"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Collapsible Group Item #1
                              </button>
                            </h5>
                          </div>

                          <div
                            id="collapseOne"
                            class="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div class="card-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid. 3
                              wolf moon officia aute, non cupidatat skateboard
                              dolor brunch. Food truck quinoa nesciunt laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                              put a bird on it squid single-origin coffee nulla
                              assumenda shoreditch et. Nihil anim keffiyeh
                              helvetica, craft beer labore wes anderson cred
                              nesciunt sapiente ea proident. Ad vegan excepteur
                              butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table, raw denim aesthetic synth nesciunt
                              you probably haven't heard of them accusamus
                              labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                              <button
                                class="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Collapsible Group Item #2
                              </button>
                            </h5>
                          </div>
                          <div
                            id="collapseTwo"
                            class="collapse"
                            aria-labelledby="headingTwo"
                            data-parent="#accordion"
                          >
                            <div class="card-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid. 3
                              wolf moon officia aute, non cupidatat skateboard
                              dolor brunch. Food truck quinoa nesciunt laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                              put a bird on it squid single-origin coffee nulla
                              assumenda shoreditch et. Nihil anim keffiyeh
                              helvetica, craft beer labore wes anderson cred
                              nesciunt sapiente ea proident. Ad vegan excepteur
                              butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table, raw denim aesthetic synth nesciunt
                              you probably haven't heard of them accusamus
                              labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-header" id="headingThree">
                            <h5 class="mb-0">
                              <button
                                class="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Collapsible Group Item #3
                              </button>
                            </h5>
                          </div>
                          <div
                            id="collapseThree"
                            class="collapse"
                            aria-labelledby="headingThree"
                            data-parent="#accordion"
                          >
                            <div class="card-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid. 3
                              wolf moon officia aute, non cupidatat skateboard
                              dolor brunch. Food truck quinoa nesciunt laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                              put a bird on it squid single-origin coffee nulla
                              assumenda shoreditch et. Nihil anim keffiyeh
                              helvetica, craft beer labore wes anderson cred
                              nesciunt sapiente ea proident. Ad vegan excepteur
                              butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table, raw denim aesthetic synth nesciunt
                              you probably haven't heard of them accusamus
                              labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="add-patient-db">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <div class="form-holder">
                  <div id="addpatient-form">
                    <h3 class="form-title my-lg-4 my-3">
                      <label class="check-holder">
                        <input
                          type="checkbox"
                          class="prescription-check"
                          checked={toshowData}
                          onChange={(e) =>
                            toshowPrescriptions(e.target.checked)
                          }
                        />
                        <span class="checkmark"></span>
                      </label>
                      Add Prescriptions
                    </h3>

                    {toshowData == true && (
                      <>
                        <div class="form-group show_prescription  mt-lg-5 mt-4">
                          <Select2
                            options={options}
                            //value={options}
                            className="dropselect"
                            isMulti
                            onChange={toselectfunction}
                            placeholder="Select Disease . . ."
                          />
                        </div>
                        {Diseases.map((diss, index2) => {
                          return (
                            <div key={diss.disease}>
                              <div class="row show_prescription">
                                <div class="col-md-12 p-lg-0">
                                  <h3 className="disease-title">
                                    {" "}
                                    {diss.disease}{" "}
                                  </h3>

                                  <table class="table prescription-table">
                                    <tr>
                                      <th colspan="4">Pills Name</th>
                                      <th>Days</th>
                                      <th>
                                        {" "}
                                        <img src={moricon} alt="" /> Mor
                                      </th>
                                      <th>
                                        {" "}
                                        <img src={noonicon} alt="" /> Noon
                                      </th>
                                      <th>
                                        {" "}
                                        <img src={eveicon} alt="" /> Eve
                                      </th>
                                      <th>
                                        Before <br /> Food
                                      </th>
                                      <th>
                                        After <br /> Food
                                      </th>
                                      <th>
                                        With
                                        <br /> Food
                                      </th>
                                      <th>Price</th>
                                      <th></th>
                                    </tr>

                                    {diss.pills.map((ent, index) => {
                                      return (
                                        <tr key={index}>
                                          <td colspan="4">
                                            {medicines && (
                                              <Select
                                                options={medicines}
                                                //className="dropselect"
                                                //className="custom-select"
                                                className="fast-option pl-0"
                                                onChange={(val) => {
                                                  selectOnchange(
                                                    val,
                                                    index,
                                                    index2
                                                  );
                                                }}
                                                placeholder="Select Medicine . . ."
                                              />
                                            )}
                                          </td>
                                          <td>
                                            <div class="qty counter-div">
                                              <span
                                                class="plus unselectable"
                                                onClick={(e) =>
                                                  howmanyInc(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="14"
                                                  height="9"
                                                  viewBox="0 0 14 9"
                                                  fill="#BBCDD9"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M13.7831 7.62842C13.8456 7.53467 13.8768 7.44092 13.8768 7.34717C13.8768 7.22217 13.8456 7.15967 13.7831 7.09717L7.25184 0.534668C7.15809 0.472168 7.06434 0.440918 6.97059 0.440918C6.84559 0.440918 6.78309 0.472168 6.72059 0.534668L0.158085 7.09717C0.0955853 7.15967 0.0643353 7.22217 0.0643353 7.34717C0.0643353 7.44092 0.0955853 7.53467 0.158085 7.62842L0.783085 8.25342C0.845585 8.31592 0.908085 8.34717 1.03309 8.34717C1.12684 8.34717 1.22059 8.31592 1.31434 8.25342L6.97059 2.59717L12.6268 8.25342C12.6893 8.31592 12.7831 8.34717 12.9081 8.34717C13.0018 8.34717 13.0956 8.31592 13.1581 8.25342L13.7831 7.62842Z" />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={ent.days}
                                                class="count form-control"
                                              />
                                              <span
                                                class="minus unselectable"
                                                onClick={(e) =>
                                                  howmanyDec(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="14"
                                                  height="9"
                                                  viewBox="0 0 14 9"
                                                  fill="#BBCDD9"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path d="M0.158383 1.35107C0.0958827 1.44482 0.0646327 1.53857 0.0646327 1.63232C0.0646327 1.75732 0.0958827 1.81982 0.158383 1.88232L6.68963 8.44482C6.78338 8.50732 6.87713 8.53857 6.97088 8.53857C7.09588 8.53857 7.15838 8.50732 7.22088 8.44482L13.7834 1.88232C13.8459 1.81982 13.8771 1.75732 13.8771 1.63232C13.8771 1.53857 13.8459 1.44482 13.7834 1.35107L13.1584 0.726074C13.0959 0.663574 13.0334 0.632324 12.9084 0.632324C12.8146 0.632324 12.7209 0.663574 12.6271 0.726074L6.97088 6.38232L1.31463 0.726074C1.25213 0.663574 1.15838 0.632324 1.03338 0.632324C0.939633 0.632324 0.845883 0.663574 0.783383 0.726074L0.158383 1.35107Z" />
                                                </svg>
                                              </span>
                                            </div>
                                          </td>
                                          <td>
                                            <div class="qty counter-div RL-counter">
                                              <span
                                                class="plus unselectable"
                                                onClick={(e) =>
                                                  morninInc(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    rx="7"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="4"
                                                    y="6.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                  <rect
                                                    x="7.5"
                                                    y="4"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    transform="rotate(90 7.5 4)"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={ent.mornpills}
                                                class="count form-control"
                                              />
                                              <span
                                                class="minus unselectable"
                                                onClick={(e) =>
                                                  morninDec(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="12"
                                                  height="12"
                                                  viewBox="0 0 12 12"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="12"
                                                    height="12"
                                                    rx="6"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="3"
                                                    y="5.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </td>
                                          <td>
                                            <div class="qty counter-div RL-counter">
                                              <span
                                                class="plus unselectable"
                                                onClick={(e) =>
                                                  noonInc(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    rx="7"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="4"
                                                    y="6.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                  <rect
                                                    x="7.5"
                                                    y="4"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    transform="rotate(90 7.5 4)"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={ent.nonpills}
                                                class="count form-control"
                                              />
                                              <span
                                                class="minus unselectable"
                                                onClick={(e) =>
                                                  noonDec(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="12"
                                                  height="12"
                                                  viewBox="0 0 12 12"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="12"
                                                    height="12"
                                                    rx="6"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="3"
                                                    y="5.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </td>
                                          <td>
                                            <div class="qty counter-div RL-counter">
                                              <span
                                                class="plus unselectable"
                                                onClick={(e) =>
                                                  EveInc(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="14"
                                                    height="14"
                                                    rx="7"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="4"
                                                    y="6.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                  <rect
                                                    x="7.5"
                                                    y="4"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    transform="rotate(90 7.5 4)"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={ent.evenpill}
                                                class="count form-control"
                                              />
                                              <span
                                                class="minus unselectable"
                                                onClick={(e) =>
                                                  EveDec(index, index2)
                                                }
                                              >
                                                <svg
                                                  width="12"
                                                  height="12"
                                                  viewBox="0 0 12 12"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <rect
                                                    width="12"
                                                    height="12"
                                                    rx="6"
                                                    fill="#E6F4F2"
                                                  />
                                                  <rect
                                                    x="3"
                                                    y="5.5"
                                                    width="6"
                                                    height="1"
                                                    className="hoversvg"
                                                    fill="#6E6E6E"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </td>

                                          <td>
                                            <label class="radio-holder">
                                              <input
                                                type="radio"
                                                name={"test" + index + index2}
                                                class="prescription-check"
                                                value="beforefood"
                                                onChange={(e) => {
                                                  tosettime(index, index2, "1");
                                                }}
                                              />
                                              <span class="checkmark"></span>
                                            </label>
                                          </td>
                                          <td>
                                            <label class="radio-holder">
                                              <input
                                                type="radio"
                                                name={"test" + index + index2}
                                                class="prescription-check"
                                                value="afterfood"
                                                onChange={(e) => {
                                                  tosettime(index, index2, "2");
                                                }}
                                              />
                                              <span class="checkmark"></span>
                                            </label>
                                          </td>
                                          <td>
                                            <label class="radio-holder">
                                              <input
                                                type="radio"
                                                name={"test" + index + index2}
                                                value="withfood"
                                                class="prescription-check"
                                                onChange={(e) => {
                                                  tosettime(index, index2, "3");
                                                }}
                                              />
                                              <span class="checkmark"></span>
                                            </label>
                                          </td>
                                          <td>
                                            <span class="price">
                                              Rs.{" "}
                                              {ent.price *
                                                (ent.days *
                                                  (Math.ceil(ent.evenpill) +
                                                    Math.ceil(ent.mornpills) +
                                                    Math.ceil(ent.nonpills)))}
                                            </span>
                                          </td>
                                          <td
                                            onClick={() => {
                                              removePill(index, index2);
                                            }}
                                          >
                                            <span className="cross-ic">
                                              &#10005;
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </table>
                                </div>
                              </div>
                              <div class="form-group show_prescription ">
                                <div
                                  class="add-meds tr_clone_add"
                                  onClick={(e) => addprescription(index2)}
                                >
                                  Add More Meds
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="add-patient-db">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <div class="form-holder">
                  <div id="addpatient-form">
                    <h3 class="form-title my-lg-4 my-3">
                      <label class="check-holder">
                        <input
                          type="checkbox"
                          class="prescription-check"
                          onChange={(e) => settoshowdatetime(e.target.checked)}
                        />
                        <span class="checkmark"></span>
                      </label>
                      Add Appointment
                    </h3>

                    {toshowdatetime == true && (
                      <>
                        <div class="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              {/* <input
                              type="text"
                              class="form-control"
                              placeholder="Date"
                              name="date"
                              required
                            /> */}
                              <label for="" class="absolute-label">
                                Date
                              </label>
                              <DateComp setformatdate={setdateformated} />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="" class="absolute-label">
                                Time
                              </label>
                              <TimeComp settimeformated={settimeformated} />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div class="btn-holder mt-md-5">
                      <button
                        class="submit btn btn-add"
                        type="button"
                        onClick={AddPresciptionApi}
                        //disabled={btnState}
                      >
                        Add Prescription
                      </button>
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
