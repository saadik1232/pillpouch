import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { baseurl } from "../../Api/ApiData";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import TableComp from "../MultiComp/TableComp";
import { Modal } from "react-bootstrap";
import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";
import spinnericon from "../../assets/images/spinner.gif";

export default function AddAppointments() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setstartTime] = useState(new Date());

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("date", formatDate(startDate));
    setdateformated(formatDate(startDate));
  }, [startDate]);

  useEffect(() => {
    console.log("time", formatAMPM(startTime));
    settimeformated(formatAMPM(startTime));
  }, [startTime]);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // console.log("hours and minutes", hours, minutes);
    // var ampm = hours >= 12 ? "pm" : "am";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    let hoursformat = hours <= 9 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    //var strTime = hoursformat + ":" + minutes + " " + ampm;
    // var strTime = hoursformat + ":" + minutes;
    var strTime = hoursformat + ":" + minutes;
    return strTime;
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  const [patientName, setpatientName] = useState(null);
  const [sex, setsex] = useState(null);
  const [age, setage] = useState(null);
  const [address, setaddress] = useState(null);
  const [location, setlocation] = useState(null);
  const [phone, setphone] = useState(null);
  const [phoneformat, setphoneformat] = useState(null);
  const [btnState, setbtnState] = useState(true);
  const [dateformated, setdateformated] = useState(null);
  const [timeformated, settimeformated] = useState(null);
  const [appointmentid, setappointmentid] = useState(null);
  const [citylist, setcitylist] = useState(null);
  const [city, setcity] = useState(null);

  const [AddEditState, setAddEditState] = useState(false);

  useEffect(() => {
    //console.log(patientName, sex, age, address, location);
    if (patientName && sex && age && address && location && phone && city) {
      console.log("all conditions true");
      if (phone.length >= 11) {
        setbtnState(false);
      }
    } else {
      setbtnState(true);
    }
  }, [patientName, sex, age, address, location, phone, city]);

  async function addPatientApi() {
    console.log(
      dateformated,
      timeformated,
      patientName,
      sex,
      age,
      address,
      location
    );

    var data;
    var url;

    if (AddEditState == true) {
      data = JSON.stringify({
        apointment_id: appointmentid,
        patient_name: patientName,
        gender: sex,
        age: age,
        apointment_date: dateformated,
        apointment_time: timeformated,
        address: address,
        city_id: "1",
        postal_code: "540000",
        user_id: localStorage.getItem("userid"),
        dum: "dum",
        phone_number: phone,
      });
      url = baseurl + "UpdateApointment";
    } else {
      data = {
        patient_name: patientName,
        gender: sex,
        age: age,
        apointment_date: dateformated,
        apointment_time: timeformated,
        address: address,
        city_id: "1",
        phone_number: phoneformat,
        postal_code: "540000",
        user_id: localStorage.getItem("userid"),
      };
      url = baseurl + "AddApointment";
    }

    console.log("data", data);

    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        swal(response.data.message).then(() => {
          if (response.data.success == "true") {
            navigate("/appointments");
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("state from router is", state);
    getcitylist();
    if (state) {
      setAddEditState(true);
      setpatientName(state.name);
      setsex(state.sex);
      setage(state.age);
      setaddress(state.address);
      setlocation(state.address);
      setappointmentid(state.appointment_id);
      setphone(state.mobile);
      setStartDate(new Date(state.date));
      var hms = "23:54";
      var target = new Date("1970-01-01 " + state.time);
      setstartTime(target);
    }
  }, []);

  async function getcitylist() {
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "get",
      url: baseurl + "ListofCities",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log("the citites list", res.data.data.citylist);
        setcitylist(res.data.data.citylist);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleMobChange(event) {
    const { value, maxLength } = event.target;

    const message = value.slice(0, maxLength);
    console.log("the entered number", isNaN(message.slice(-1)));

    if (isNaN(message.slice(-1)) == false && message.slice(-1) !== " ") {
      setphone(message);
      setphoneformat(addformat(message));
    }
  }

  function addformat(val) {
    const replaced = "92" + val.substring(1);
    return replaced;
  }

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
                setpresciptionData([]);
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
  const [dummydata, setdummydata] = useState(null);

  const [options, setoptions] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [presciptionData, setpresciptionData] = useState(null);

  const [name, setname] = useState("");

  const [patienthistory, setpatienthistory] = useState(null);

  function onBlur() {
    console.log("the phone number is on blur ", phoneformat);
    tocheckhistory();
    setpatientName(null);
    setsex(null);
    setage(null);
  }

  async function tocheckhistory() {
    var data = JSON.stringify({
      phone_number: phoneformat,
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
          settoviewtablestate(true);
          setpatienthistory(res.data.data.PatientHistory);
          setdummydata(res.data.data.PatientHistory);
          setoptions({
            custom: true,
            totalSize: parseInt(dd.length),
          });
          setpatientName(dd[0].patient_name);
          setsex(dd[0].gender);
          setage(dd[0].age);
          setaddress(dd[0].address);
          setlocation(dd[0].location);
        } else {
          settoviewtablestate(false);
          setpatienthistory([]);
        }
      })
      .catch(function (error) {
        console.log(error);
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

  const [loaderstate, setloaderstate] = useState(true);
  const [toviewtablestate, settoviewtablestate] = useState(false);

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section">
          <div class="container">
            <div class="add-patient-db">
              <div class="row">
                <div class="col-lg-12">
                  <h2 class="main-title">
                    {AddEditState ? "Edit" : "Add"} Appointment
                  </h2>
                </div>
              </div>

              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="form-holder">
                    <form id="addappoint-form">
                      <div class="form-group">
                        <input
                          type="text"
                          name="location"
                          class="form-control"
                          required
                          value={phone}
                          onChange={(e) => handleMobChange(e)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onBlur={() => onBlur()}
                          placeholder="03XXXXXXXXX"
                          maxLength={11}
                        />
                        <label for="" class="absolute-label">
                          Phone
                        </label>
                      </div>

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
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              minDate={new Date()}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label for="" class="absolute-label">
                              Time
                            </label>
                            <DatePicker
                              selected={startTime}
                              onChange={(date) => setstartTime(date)}
                              //showTimeSelect
                              className="form-control"
                              showTimeSelectOnly
                              timeInputLabel="Time:"
                              dateFormat="h:mm aa"
                              showTimeInput
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Patient Name"
                          name="patient-name"
                          value={patientName}
                          onChange={(e) => setpatientName(e.target.value)}
                          required
                        />
                        <label for="" class="absolute-label">
                          Patient Name
                        </label>
                      </div>
                      <div class="form-group">
                        <select
                          name="sex"
                          id=""
                          className="custom-select"
                          value={sex}
                          onChange={(e) => setsex(e.target.value)}
                        >
                          <option value="">Select sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div class="form-group">
                        <select
                          name="city"
                          id=""
                          className="custom-select"
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                        >
                          <option value="">Select City</option>
                          {citylist &&
                            citylist.map((ent) => (
                              <option value={ent.city_id}>
                                {ent.city_name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="patient-age"
                          placeholder="Age"
                          required
                          value={age}
                          onChange={(e) => setage(e.target.value)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        <label for="" class="absolute-label">
                          Age
                        </label>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          onChange={(e) => setaddress(e.target.value)}
                          value={address}
                          name="patient-address"
                          placeholder="Address"
                          required
                        />
                        <label for="" class="absolute-label">
                          Address
                        </label>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          name="location"
                          class="form-control"
                          placeholder="Location"
                          required
                          value={location}
                          onChange={(e) => setlocation(e.target.value)}
                        />
                        <label for="" class="absolute-label">
                          Location
                        </label>
                      </div>

                      <div class="btn-holder mt-md-5">
                        <button
                          class="submit btn btn-add"
                          type="button"
                          onClick={addPatientApi}
                          disabled={btnState}
                        >
                          {AddEditState ? "Edit" : "Add"} Appointment
                        </button>
                        {/* <input
                          class="submit btn btn-add"
                          type="button"
                          value="Add Appointment"
                          onClick={console.log("test")}
                        /> */}
                        <div
                          class="btn-cancel"
                          onclick={() => navigate("/appointments")}
                        >
                          Cancel
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="patient-listing">
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

              {toviewtablestate == true && (
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
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
