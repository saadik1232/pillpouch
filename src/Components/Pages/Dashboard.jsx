import React, { useEffect, useState } from "react";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import PerfectScrollbar from "react-perfect-scrollbar";
import Slider from "react-slick";
import axios from "axios";
import { baseurl } from "../../Api/ApiData";
import usericon from "../../assets/images/placeholder-user.png";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarComp from "../MultiComp/CalendarComp";
import profileholder from "../../assets/images/profile-holder.png";
import spinnericon from "../../assets/images/spinner.gif";

export default function Dashboard() {
  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  const [patientlist, setpatientlist] = useState(null);
  const [upcomingAppointments, setupcomingAppointments] = useState(null);
  const [recentlyAdded, setrecentlyAdded] = useState(null);
  const [totalPatient, settotalPatient] = useState(null);
  const [dateWiseAppData, setdateWiseAppData] = useState(null);

  const [selectedindex, setselectedindex] = useState(0);

  const [calendarapoointmentdata, setcalendarapoointmentdata] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    getDashboarData();
    if (state) {
      console.log("state exists in dahsboard", state);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log("useff for pariten", patientlist);
  }, [patientlist]);

  async function getDashboarData() {
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "post",
      url: baseurl + "Dashboard",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data);
        settotalPatient(res.data.data.TotalPatient);
        setrecentlyAdded(res.data.data.RecentlyAddedPatient);

        setupcomingAppointments(res.data.data.DateList);
        dateWiseAppointment(res.data.data.DateList[0].Completedate);
        setpatientlist(res.data.data.PatientsLists);
        setrecentlyAdded(res.data.data.RecentlyAddedPatient);
        settotalPatient(res.data.data.TotalPatient);
        setcalendarapoointmentdata(res.data.data.AllApointments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function dateWiseAppointment(date) {
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
      date: date,
    });

    var config = {
      method: "post",
      url: baseurl + "DatewiseApointment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log("date wise appointement", res.data.data.TodayApointments);
        setdateWiseAppData(res.data.data.TodayApointments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("dates", upcomingAppointments);
  }, [upcomingAppointments]);

  function getcurrentmonth() {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date();
    let name = month[d.getMonth()];
    return name;
  }

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section">
          <div class="container-fluid">
            {/* <div class="row">
              <div class="col-md-8">
                <h2 class="main-title">Doctor Dashboard</h2>
              </div>
              <div class="col-md-4 text-right">
                <button
                  class="btn btn-add-patient"
                  onClick={(e) => //navigate("/addpatient")}
                >
                  Add Patient
                </button>
              </div>
            </div> */}
            <div class="row mt-lg-5 mt-4">
              <div class="col-lg-9">
                <div class="row">
                  {/* <div class="col-lg-12">
                    <h2 class="main-title mb-4">All Patients</h2>
                  </div> */}

                  <div class="col-lg-12">
                    <div class="all-patients">
                      {/* <PerfectScrollbar>
                        <div class="table-holder">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Illness</th>
                                <th>Last Visit</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {patientlist &&
                                patientlist.map((ent) => {
                                  return (
                                    <tr>
                                      <td>{ent.patient_name}</td>
                                      <td>ID: {ent.Id}</td>
                                      <td>{ent.disease}</td>
                                      <td>{ent.last_visit_date}</td>
                                      <td>
                                        <div class="btn-group dropleft"></div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </PerfectScrollbar> */}
                      <div className="dashboard-calendar">
                        {calendarapoointmentdata && (
                          <CalendarComp
                            data={calendarapoointmentdata}
                            Cstate={state}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="db-right-main mb-4">
                  <div class="appointments">
                    <h3>Recent Patients</h3>

                    {/* <span class="month">{getcurrentmonth()}</span> */}
                    {/* 
                    <div class="date-slider">
                      <Slider {...settings}>
                        {upcomingAppointments &&
                          upcomingAppointments.map((ent, index) => (
                            <div>
                              <div
                                //class="date-box"

                                class={
                                  index == selectedindex
                                    ? "date-box active"
                                    : "date-box"
                                }
                                onClick={(e) => {
                                  console.log(ent);
                                  dateWiseAppointment(ent.Completedate);
                                  setselectedindex(index);
                                }}
                              >
                                <span class="appointment-date">{ent.date}</span>
                                <span class="appointment-day">
                                  {ent.day.substring(0, 3)}
                                </span>
                                <span class="status bullet no-status"></span>
                              </div>
                            </div>
                          ))}
                      </Slider>
                    </div> */}
                  </div>
                  <PerfectScrollbar>
                    <div class="patients-appointed">
                      <ul>
                        {/* <li className="patient-box">
                          <div className="img-holder">
                            <img src={usericon} alt="" />
                          </div>
                          <div className="text-hold">
                            <h4>Mohsin Rohani</h4>
                            <span className="datehold">
                              Date: 12/01/2022 | 8:00AM
                            </span>
                          </div>
                        </li> */}
                        {patientlist ? (
                          <>
                            {patientlist.map((ent) => (
                              <>
                                <li
                                  className="patient-box"
                                  onClick={(e) => {
                                    navigate("/patientdetail", {
                                      state: { id: ent.patient_user_id },
                                    });
                                    //console.log("test run", ent);
                                  }}
                                >
                                  <div className="img-holder">
                                    {ent.img ? (
                                      <>
                                        <img src={ent.img} alt="" />
                                      </>
                                    ) : (
                                      <>
                                        <img src={profileholder} alt="" />
                                      </>
                                    )}
                                  </div>
                                  <div className="text-hold">
                                    <h4>{ent.patient_name}</h4>
                                    <span className="datehold">
                                      {ent.last_visit_date && (
                                        <>Date: {ent.last_visit_date}</>
                                      )}
                                    </span>
                                  </div>
                                </li>
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            <section class="content-section">
                              <div className="gifloader">
                                <img src={spinnericon} alt="" />
                              </div>
                            </section>
                          </>
                        )}

                        {/* {dateWiseAppData &&
                          dateWiseAppData.map((ent) => (
                            <li
                              class="patient-box"
                              onClick={() => {
                                console.log("test", ent.patient_id);
                                navigate("/patientdetail", {
                                  state: { id: ent.patient_id },
                                });
                              }}
                            >
                              <h4 class="patient-name">{ent.patient_name}</h4>
                              {ent.last_visit_date.length == 0 ? (
                                <></>
                              ) : (
                                <span class="medicine">
                                  Last Visited Date {ent.last_visit_date}
                                </span>
                              )}
                              <span class="medicine">
                                Appointment Date {ent.apointment_date}
                              </span>
                            </li>
                          ))} */}
                      </ul>
                    </div>
                  </PerfectScrollbar>

                  <div class="bottom-btn">
                    <div class="height-btn">
                      <img src="assets/images/caret-down.png" alt="" />
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
