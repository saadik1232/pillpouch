import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Body from "./Components/Header/Body";
import Hero from "./Components/Hero_Section/Hero";
import AddAppointments from "./Components/Pages/AddAppointments";
import Appointmentdetail from "./Components/Pages/Appointmentdetail";
// import Appointments from "./Components/Pages/Appointments";
// import Dashboard from "./Components/Pages/Dashboard";
import How_it_works from "./Components/Pages/How_it_works";
import Pricing from "./Components/Pages/Pricing";
import Reviews from "./Components/Pages/Reviews";
import Signin from "./Components/Pages/Signin";
import Add_Patient from "./Components/Patients/Add_Patient";
import Patientdetail from "./Components/Patients/Patientdetail";
import Patients from "./Components/Patients/Patients";
import Prescriptions from "./Components/Prescreptions/Prescriptions";
import Doctorprofile from "./Components/Doctor/Doctorprofile";
import Doctor from "./Components/Doctor/Doctor";
import Rollmanagement from "./Components/Admin/Rollmanagement";
import Rolls from "./Components/Admin/Rolls";
import Rolledit from "./Components/Admin/Rolledit";
import User_management from "./Components/User_Management/User_management";
import Add_User from "./Components/User_Management/Add_User";

import "./Components/FontAwesomeIcons";
import AddRole from "./Components/Admin/AddRole";
import AddPresc from "./Components/Operations/AddPresc";
import UploadedPresc from "./Components/Operations/UploadedPresc";
import Edit_User from "./Components/User_Management/Edit_User";
import PageManag from "./Components/PageManagment/PageManag";
import AddPage from "./Components/PageManagment/AddPage";
import EditPage from "./Components/PageManagment/EditPage";
import UserEditPage from "./Components/User_Management/UserEditPage";
import React, { Suspense, useEffect } from "react";
import ProtectedRoute from "./Components/RouteComponet/ProtectedRoute";
import CalendarComp from "./Components/MultiComp/CalendarComp";
import AddAppointNew from "./Components/Pages/AddAppointNew";
import PatientHistory from "./Components/Pages/PatientHistory";
import One from "./Components/DummyPages/One";
import Two from "./Components/DummyPages/Two";

function App() {
  // console.log("useeffect in App.js");

  useEffect(() => {
    console.log("useeffect in App.js");
  }, []);

  function test(params) {
    console.log("test on oneneter");
  }

  const Dashboard = React.lazy(() => import("./Components/Pages/Dashboard"));
  const Appointments = React.lazy(() =>
    import("./Components/Pages/Appointments")
  );

  return (
    <>
      {" "}
      <Router>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/test" element={<Body />} />
            <Route path="/howitworks" element={<How_it_works />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/dashboard"
              // element={<Dashboard  />}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="user" element={<One />}>
              <Route path="profile" element={<Two />} />
            </Route>

            {/* Appointment Routes */}
            {/* <Route path="/appointments" element={<Appointments />} /> */}
            {/* <Route
              path="/appointments"
              element={
                <ProtectedRoute onenter={test}>
                  <Appointments />
                </ProtectedRoute>
              }
            /> */}

            <Route path="/addappointments" element={<AddAppointments />} />
            <Route path="/addappointmentsnew" element={<AddAppointNew />} />
            <Route path="/patienthistory" element={<PatientHistory />} />

            <Route
              path="/appointmentdetail/:appid/:userid"
              element={<Appointmentdetail />}
            />

            {/* Patient Routes */}
            <Route
              path="/patientlist"
              element={
                <ProtectedRoute onenter={test}>
                  <Patients />
                </ProtectedRoute>
              }
              // element={<Patients />}
            />
            <Route path="/addpatient" element={<Add_Patient />} />
            <Route path="/patientdetail" element={<Patientdetail />} />

            {/* Prescription Routes */}
            <Route
              path="/prescriptions"
              element={
                <ProtectedRoute>
                  <Prescriptions />
                </ProtectedRoute>
              }
              // element={<Prescriptions />}
            />

            {/* Doctor Routes */}
            <Route
              path="/doctorList"
              // element={<Doctor />}
              element={
                <ProtectedRoute>
                  <Doctor />
                </ProtectedRoute>
              }
            />
            <Route path="/doctorprofile" element={<Doctorprofile />} />

            {/* operations route */}
            <Route
              path="/addprescription"
              // element={<AddPresc />}
              element={
                <ProtectedRoute>
                  <AddPresc />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uploadedPrescription"
              // element={<UploadedPresc />}
              element={
                <ProtectedRoute>
                  <UploadedPresc />
                </ProtectedRoute>
              }
            />

            {/* Role Managment Routes */}
            <Route path="/rollsmang" element={<Rolls />} />
            <Route path="/rolledit" element={<Rolledit />} />
            <Route path="/rolls" element={<Rollmanagement />} />
            <Route path="/addroll" element={<AddRole />} />

            {/* User Managment Routes */}
            <Route path="/usermanagement" element={<User_management />} />
            <Route path="/adduser" element={<Add_User />} />
            <Route path="/edituser" element={<Edit_User />} />
            <Route path="/userprofile" element={<UserEditPage />} />

            {/* Page Management */}
            <Route path="/pagemanag" element={<PageManag />} />
            <Route path="/addpage" element={<AddPage />} />
            <Route path="/editpage" element={<EditPage />} />

            <Route path="/test123" element={<CalendarComp />} />

            {/* no match route */}
            <Route path="*" element={<Hero />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
