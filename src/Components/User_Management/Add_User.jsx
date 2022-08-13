import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import { baseurl } from "../../Api/ApiData";
import swal from "sweetalert";
import Select2 from "react-select";
import validator from "validator";

export default function Add_User() {
  const location = useLocation();
  const [Diseases, setDiseases] = useState();
  const [state, setstate] = useState(location.state);
  const [pages, setpages] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);
  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [roleid, setroleid] = useState(null);
  const [userid, setuserid] = useState(null);

  const [firstname, setfirstname] = useState(null);
  const [last_name, set_lastname] = useState(null);
  const [email, setemail] = useState("");
  const [sex, setsex] = useState(null);
  const [age, setage] = useState(null);
  const [address, setaddress] = useState(null);
  const [phone, setphone] = useState(null);
  const [phoneformat, setphoneformat] = useState(null);

  const [password, setpassword] = useState(null);
  const [password2, setpassword2] = useState(null);

  const [btnstate, setbtnstate] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("state", state);
    getUserTypes();
    getRoleTypes();
  }, []);

  async function getUserTypes() {
    var config = {
      method: "get",
      url: baseurl + "ListofUserTypes",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(function (res) {
        console.log("data", res.data.data.user_types);
        let usertypes = res.data.data.user_types;
        let des = [];

        for (let j = 0; j < usertypes.length; j++) {
          const element = {
            value: usertypes[j].user_type_id,
            label: usertypes[j].description,
          };
          des.push(element);
        }
        console.log("the user types", des);
        setoptions(des);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getRoleTypes() {
    var config = {
      method: "get",
      url: baseurl + "ListofRoles",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.roles);
        let roles = res.data.data.roles;

        let des = [];
        for (let j = 0; j < roles.length; j++) {
          const element = {
            value: roles[j].role_id,
            label: roles[j].title,
          };
          des.push(element);
        }
        console.log("the role types", des);
        setoptions2(des);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [options, setoptions] = useState([null]);
  const [options2, setoptions2] = useState([null]);

  async function editapi() {
    setloaderstate(true);
    var data = JSON.stringify({
      role_id: state.id,
      title: title,
      description: description,
      page_permissions: pages,
    });

    var config = {
      method: "post",
      url: baseurl + "UpdateRole",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if ((res.data.success = "true")) {
          swal(res.data.message).then(() => {
            //getroledata()
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onchangeofDropdown(val, name) {
    console.log("react sletct", val);
    setuserid(val.value);
  }

  function onchangeofDropdownrole(val, name) {
    console.log("react sletct", val);
    setroleid(val.value);
  }

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

  function SaveBtn() {
    console.log(
      "test",
      firstname,
      last_name,
      email,
      age,
      sex,
      phoneformat,
      password,
      password2,
      roleid,
      userid
    );
    if (password == password2) {
      AddPatientApi();
    } else {
      swal("Passwords Must be same.");
    }
  }

  useEffect(() => {
    if (
      firstname &&
      last_name &&
      validator.isEmail(email) &&
      age &&
      sex &&
      phoneformat &&
      password &&
      password2 &&
      roleid &&
      userid
    ) {
      setbtnstate(false);
    } else {
      setbtnstate(true);
    }
  }, [
    firstname,
    last_name,
    email,
    age,
    sex,
    phoneformat,
    password,
    password2,
    roleid,
    userid,
  ]);

  async function AddPatientApi() {
    var data = JSON.stringify({
      first_name: firstname,
      last_name: last_name,
      phone_number: phoneformat,
      email: email,
      gender: sex,
      age: age,
      address: address,
      password: password,
      role_id: roleid,
      user_type_id: userid,
    });

    var config = {
      method: "post",
      url: baseurl + "AddUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res);
        if (res.data.success == "true") {
          swal(res.data.message).then(() => {
            navigate("/usermanagement");
          });
        } else {
          swal(res.data.message);
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
        <section class="content-section editrole-section">
          <div class="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="main-title"> <b>Add User</b></h2>
              </div>
              <div className="col-md-6 text-right">
                <div className="btn-holder">
                  <div
                    className="btn btn-cancel"
                    onClick={(e) => navigate("/usermanagement")}
                  >
                    Cancel
                  </div>
                  <button
                    disabled={btnstate}
                    className="btn btn-save"
                    onClick={(e) => SaveBtn()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="role-holder">
              <div className="row mb-3">
                <div className="col-md-8">
                  <h3>
                    Details{" "}
                    <span>
                      Authors can manage and publish the content they created
                    </span>
                  </h3>
                </div>
                <div className="col-md-4 text-right">
                  {/* <span className="user-count">6 users with this role</span> */}
                </div>
              </div>
              <form action="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => {
                          setfirstname(e.target.value);
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => {
                          set_lastname(e.target.value);
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        type="email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Age</label>
                      <input
                        id="Age"
                        name="Age"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => {
                          setage(e.target.value);
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Gender</label>

                      <select
                        className="form-control"
                        onChange={(e) => {
                          setsex(e.target.value);
                        }}
                      >
                        <option value="">Select Gender </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Phone Number</label>
                      <input
                        id="Phone"
                        value={phone}
                        onChange={(e) => handleMobChange(e)}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        placeholder="03XXXXXXXXX"
                        maxLength={11}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="Password"
                        placeholder="Password"
                        value={password}
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Cpassword">Confirm Password</label>
                      <input
                        id="Cpassword"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => {
                          setpassword2(e.target.value);
                        }}
                        type="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="caddress">Address</label>
                      <input
                        id="caddress"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                      <div className="form-group">
                      <label htmlFor="switch">Active</label>
                        <div className="switch-holder box-switch" >
                          <input id="switch" type="checkbox" />
                          <label for="switch" className="switch">
                            <div> </div>
                          </label>
                        </div>
                      </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="role-holder">
              <div className="row mb-3">
                <div className="col-md-8">
                  <h3>Attributed User Type</h3>
                </div>
              </div>
              <form action="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select2
                        options={options}
                        //value={options}
                        className="dropselect"
                        //isMulti
                        //onChange={toselectfunction}
                        onChange={onchangeofDropdown}
                        placeholder="Select User Type . . ."
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <br />
            <div className="role-holder">
              <div className="row mb-3">
                <div className="col-md-8">
                  <h3>Attributed Role Type</h3>
                </div>
              </div>
              <form action="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select2
                        options={options2}
                        //value={options}
                        className="dropselect"
                        //isMulti
                        //onChange={toselectfunction}
                        onChange={onchangeofDropdownrole}
                        placeholder="Select Role Type . . ."
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        </section>
      </div>
    </>
  );
}
