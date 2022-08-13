import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import Select2 from "react-select";
//import Select from "react-select-virtualized";
import Select from "react-select-virtualized";

import _, { isUndefined } from "lodash";

import moricon from "../../assets/images/mor-icon.png";
import noonicon from "../../assets/images/noon-icon.png";
import eveicon from "../../assets/images/eve-icon.png";
import { baseurl } from "../../Api/ApiData";
import axios from "axios";
import DateComp from "../MultiComp/DateComp";
import TimeComp from "../MultiComp/TimeComp";
import { formatDate, pagesid } from "../MultiComp/Utils";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getlogindata } from "../../Store/LoginReducer";
import { useSelector } from "react-redux";

export default function AddPresc() {
  const navigate = useNavigate();

  const [toshowData, settoshowData] = useState(null);

  const [diseasesdata, setdiseasesdata] = useState([]);

  const [medicines, setmedicines] = useState(null);

  const [Diseases, setDiseases] = useState([]);

  const [prescriptions, setprescriptions] = useState([
    {
      pillsname: "1",
      days: "5",
      days: "",
      time: "",
      Food: "",
      price: "",
    },
    // {
    //   pillsname: "2",
    //   days: "8",
    //   days: "",
    //   time: "",
    //   Food: "",
    //   price: "",
    // },
    // {
    //   pillsname: "3",
    //   days: "4",
    //   days: "",
    //   time: "",
    //   Food: "",
    //   price: "",
    // },
  ]);

  const [patientName, setpatientName] = useState(null);
  const [sex, setsex] = useState(null);
  const [age, setage] = useState(null);
  const [address, setaddress] = useState(null);
  const [location, setlocation] = useState(null);
  const [phone, setphone] = useState(null);
  const [phoneformat, setphoneformat] = useState(null);
  const [dateformated, setdateformated] = useState(null);
  const [timeformated, settimeformated] = useState(null);

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

  // function daysInc(index) {
  //   let dum = [...prescriptions];
  //   let incr = dum[index];
  //   incr.days++;
  //   dum[index] = incr;
  //   console.log(dum);
  //   setprescriptions(dum);
  // }

  // function daysDec(index) {
  //   let dum = [...prescriptions];
  //   let incr = dum[index];
  //   incr.days--;
  //   dum[index] = incr;
  //   console.log(dum);
  //   setprescriptions(dum);
  // }

  function tosettime(innerindex, outerindex2, name) {
    //console.log("test");
    let dum = [...Diseases];
    let incr = dum[outerindex2].pills[innerindex];
    incr.timetotake = name;
    dum[outerindex2].pills[innerindex] = incr;
    //console.log("dum", dum);
    setDiseases(dum);
  }

  const rolesdataredux = useSelector(getlogindata);
  const [permisssion, setpermisssion] = useState(null);

  useEffect(() => {
    let tocheck = rolesdataredux.role.filter(
      (ent) => ent.page_id == pagesid.addprescription
    );
    setpermisssion(tocheck[0].permissions);
    if (tocheck.length > 0 && tocheck[0].permissions[0].status == true) {
      togetDropDownData();
    } else {
      navigate("/dashboard");
    }
  }, []);

  async function togetDropDownData(params) {
    var config = {
      method: "get",
      url: baseurl + "GetAllDropdowns",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data);
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

  const options2 = [
    { value: "Dengue", label: "Dengue", price: "20" },
    { value: "Malaria", label: "Malaria", price: "100" },
    { value: "Typhoid", label: "Typhoid", price: "200" },
  ];

  const [options, setoptions] = useState([null]);

  function toshowPrescriptions(val) {
    //console.log(val);
    if (val == true) {
      settoshowData(true);
    } else {
      settoshowData(false);
    }
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

  useEffect(() => {
    console.log("use effect of diseasedata", Diseases);
  }, [Diseases]);

  useEffect(() => {
    //console.log("use effect of dateformated", options);
  }, [options]);

  function handleMobChange(event) {
    const { value, maxLength } = event.target;

    const message = value.slice(0, maxLength);
    //console.log("the entered number", isNaN(message.slice(-1)));

    if (isNaN(message.slice(-1)) == false && message.slice(-1) !== " ") {
      setphone(message);
      setphoneformat(addformat(message));
    }
  }

  function addformat(val) {
    const replaced = "92" + val.substring(1);
    return replaced;
  }

  const [btnState, setbtnState] = useState(true);

  useEffect(() => {
    // console.log(
    //   "ueseeffcet of btn state",
    //   patientName,
    //   sex,
    //   age,
    //   address,
    //   phoneformat,
    //   dateformated,
    //   timeformated
    // );
    if (
      //   patientName &&
      //   sex &&
      //   age &&
      //   address !== "null" &&
      //timeformated &&
      phoneformat &&
      dateformated &&
      Diseases.length > 0
    ) {
      console.log(true);
      setbtnState(false);
    } else {
      setbtnState(true);
    }
  }, [
    //patientName,
    //sex,
    //age,
    //address,
    phoneformat,
    dateformated,
    timeformated,
    Diseases,
  ]);

  async function AddPresciptionApi() {
    console.log(
      "test",
      patientName,
      sex,
      age,
      address,
      phoneformat,
      dateformated,
      timeformated
    );
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
    //   patient_name: patientName,
    //   gender: sex,
    //   age: age,
    //   city_id: "1",
    //   shipping_address_id: addressid,
    //   shipping_address: address,
    //   next_visit_date: dateformated,
    //   next_visit_time: timeformated,
    //   prescription_date: formatDate(new Date()),

    let data = {
      phone_number: phoneformat,
      user_id: localStorage.getItem("userid"),
      prescription_date: dateformated,
      prescription_detail: prescription_detail,
    };

    // var data = {
    //   patient_name: patientName,
    //   phone_number: phoneformat,
    //   gender: sex,
    //   age: age,
    //   city_id: "1",
    //   shipping_address_id: addressid,
    //   shipping_address: address,
    //   next_visit_date: dateformated,
    //   next_visit_time: timeformated,
    //   user_id: localStorage.getItem("userid"),
    //   prescription_date: formatDate(new Date()),
    //   prescription_detail: prescription_detail,
    // };

    // console.log("prescrip detail", data);

    let config = {
      method: "post",
      url: baseurl + "AddPrescription",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if (res.data.success == "true") {
          if (localStorage.getItem("usertype_id") == "2") {
            swal(res.data.message).then(() => navigate("/prescriptions"));
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

  function removePill(innerindex, outerindex2) {
    //console.log(innerindex, outerindex2);
    let dum = [...Diseases];
    delete dum[outerindex2].pills[innerindex];
    //console.log(dum);
    setDiseases(dum);
  }

  const [addresslist, setaddresslist] = useState(null);
  const [addressid, setaddressid] = useState(0);
  const [addressvalue, setaddressvalue] = useState(null);

  async function checkforAdd() {
    console.log("onblur");
    setaddresslist(null);
    if (phoneformat.length == 12) {
      console.log("length is 11", phoneformat);
      var data = JSON.stringify({
        phone_number: phoneformat,
      });

      var config = {
        method: "post",
        url: baseurl + "CheckPatientExist",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then(function (res) {
          console.log(res.data);
          if (res.data.data.address_list.length > 0) {
            setaddresslist(res.data.data.address_list);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
                  <h2 class="main-title">Add Prescription</h2>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="form-holder">
                    <div id="addpatient-form">
                      {/* <h3 class="form-title">Patient General Information</h3> */}
                      {/* <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Patient Name"
                          name="patient-name"
                          value={patientName}
                          onChange={(e) => setpatientName(e.target.value)}
                        />
                        <label class="absolute-label">Patient Name</label>
                      </div> */}
                      <div class="form-group">
                        <input
                          type="number"
                          name="phone"
                          class="form-control"
                          //placeholder="Mobile Number"
                          value={phone}
                          onChange={(e) => handleMobChange(e)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          placeholder="03XXXXXXXXX"
                          maxLength={11}
                          onBlur={(e) => {
                            checkforAdd();
                          }}
                        />
                        <label class="absolute-label">Mobile Number</label>
                      </div>
                      {/* <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="patient-age"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => setage(e.target.value)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        <label class="absolute-label">Age</label>
                      </div>
                      <div class="form-group">
                        <select
                          name="sex"
                          id=""
                          className="custom-select"
                          onChange={(e) => setsex(e.target.value)}
                        >
                          <option value="">Select sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div> */}
                      <div class="form-group">
                        {/* <input
                          type="text"
                          class="form-control"
                          placeholder="Visit Date"
                          required
                        /> */}
                        {/* <label for="" class="absolute-label">
                          Visit Date
                        </label> */}
                        <DateComp setformatdate={setdateformated} />
                      </div>
                      {/* <div class="form-group">
                        <TimeComp settimeformated={settimeformated} />
                      </div> */}
                      {/* <div class="form-group">
                        {addresslist ? (
                          <>
                            <select
                              class="form-control"
                              onChange={(e) => {
                                let value = JSON.parse(e.target.value);
                                // console.log(value);
                                // console.log("value id", value.text, value.id);
                                if (value.id == null) {
                                  setaddressid(null);
                                  setaddress(null);
                                } else {
                                  setaddressid(value.id);
                                  setaddress(value.text);
                                }
                              }}
                            >
                              {" "}
                              <option
                                value={JSON.stringify({
                                  id: "null",
                                  text: "null",
                                })}
                              >
                                Select Address
                              </option>
                              ;
                              {addresslist.map((ent, key) => {
                                return (
                                  <option
                                    value={JSON.stringify({
                                      id: ent.shipping_address_id,
                                      text: ent.shipping_address,
                                    })}
                                  >
                                    {ent.shipping_address}
                                  </option>
                                );
                              })}
                            </select>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              class="form-control"
                              name="patient-address"
                              placeholder="Address"
                              onChange={(e) => setaddress(e.target.value)}
                              value={address}
                            />
                          </>
                        )}

                      </div> */}

                      {options && (
                        <h3 class="form-title my-lg-4 my-3">
                          <label class="check-holder">
                            <input
                              type="checkbox"
                              class="prescription-check"
                              onChange={(e) =>
                                toshowPrescriptions(e.target.checked)
                              }
                            />
                            <span class="checkmark"></span>
                          </label>
                          Patient Prescriptions
                        </h3>
                      )}

                      {/* start */}
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
                              <>
                                <div class="row show_prescription ">
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
                                          <tr>
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
                                                    tosettime(
                                                      index,
                                                      index2,
                                                      "1"
                                                    );
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
                                                    tosettime(
                                                      index,
                                                      index2,
                                                      "2"
                                                    );
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
                                                    tosettime(
                                                      index,
                                                      index2,
                                                      "3"
                                                    );
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
                              </>
                            );
                          })}
                        </>
                      )}

                      {/* ending */}
                      <div class="btn-holder">
                        <button
                          class="submit btn btn-add"
                          onClick={AddPresciptionApi}
                          disabled={btnState}
                        >
                          Add Prescription
                        </button>
                        <a href="#" class="btn-cancel">
                          Cancel
                        </a>
                      </div>
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
