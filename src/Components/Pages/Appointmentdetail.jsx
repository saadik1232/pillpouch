import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../../Api/ApiData";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";

export default function Appointmentdetail() {
  const params = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log("state in app det", state);

  const [name, setname] = useState(null);
  const [age, setage] = useState(null);
  const [sex, setsex] = useState(null);
  const [mobile, setmobile] = useState(null);
  const [visitDate, setvisitDate] = useState(null);
  const [address, setaddress] = useState(null);
  const [disease, setdisease] = useState(null);
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const [appointmenttime, setappointmenttime] = useState(null);

  useEffect(() => {
    console.log("params", params);
    AppDetApi();
    return () => {};
  }, []);

  function gobackClick() {
    navigate("/appointments", {
      state: {
        page: state.page,
      },
    });
  }

  async function AppDetApi() {
    var data = JSON.stringify({
      apointment_id: params.appid,
      user_id: params.userid,
    });

    var config = {
      method: "post",
      url: baseurl + "ApointmentDetail",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.apointment_detail);
        let dd = res.data.data.apointment_detail;
        console.log(
          "date time converted",
          //dd.not_converted_date,
          //dd.not_converted_time,
          //Date(dd.not_converted_date),
          new Date(dd.not_converted_date)
          // Date.parse("23:54")
        );

        setname(res.data.data.patient_name);
        setage(res.data.data.apointment_detail.age);
        setsex(res.data.data.apointment_detail.gender);
        setvisitDate(res.data.data.apointment_detail.apointment_date);
        setaddress(res.data.data.apointment_detail.address);
        setdisease(res.data.data.Disease);
        setmobile(res.data.data.apointment_detail.phone_number);
        setdate(res.data.data.apointment_detail.not_converted_date);
        settime(res.data.data.apointment_detail.not_converted_time);
        setappointmenttime(res.data.data.apointment_detail.apointment_time);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function gotoAddApp() {
    //navigate("/addappointments");
    navigate("/addappointments", {
      state: {
        appointment_id: params.appid,
        name: name,
        age: age,
        sex: sex,
        mobile: mobile,
        visitDate: visitDate,
        address: address,
        disease: disease,
        phone: mobile,
        date: date,
        time: time,
      },
    });
  }

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section patient-details mb-3">
          <div class="container">
            <div class="details-hold">
              <div class="row justify-content-center">
                <div class="col-md-12 mb-5">
                  <h2 class="main-title">Appointment Details</h2>
                </div>
                <div class="col-md-9 pt-lg-5 pt-4">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <div class="title-box">
                        <h2 class="name">{name}</h2>
                        <h4 class="disease">
                          {disease}
                          <span class="time ml-3"></span>
                        </h4>
                      </div>
                    </div>
                    <div class="col-md-6 text-right">
                      <div class="btn-holder">
                        <button class="btn" onClick={gotoAddApp}>
                          {" "}
                          Edit{" "}
                        </button>
                        <button class="btn-back btn ml-3" onClick={gobackClick}>
                          Go Back
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row info">
                    <div class="col-md-12">
                      <h3 class="info-title">Patient’s Overview</h3>
                      <table class="table table-information">
                        <tr>
                          <td>Name</td>
                          <td>{name}</td>
                        </tr>
                        <tr>
                          <td>Mobile Number</td>
                          <td>{mobile}</td>
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
                          <td>{visitDate}</td>
                        </tr>
                        <tr>
                          <td>Visit Time</td>
                          <td>{appointmenttime}</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>{address}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>{mobile}</td>
                        </tr>
                      </table>
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
