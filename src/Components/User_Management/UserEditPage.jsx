import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import "react-datepicker/dist/react-datepicker.css";
import { baseurl } from "../../Api/ApiData";
import axios from "axios";
import profileholder from "../../assets/images/profile-holder.png";
import swal from "sweetalert";
import { useRef } from "react";
import validator from "validator";
import spinnericon from "../../assets/images/spinner.gif";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserEditPage() {
  const [name, setname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [mobile, setmobile] = useState(null);
  const [mobileformat, setmobileformat] = useState(null);
  const [email, setemail] = useState("");
  const [specialization, setspecialization] = useState(null);
  const [hospitalclinic, sethospitalclinic] = useState(null);
  const [gender, setgender] = useState(null);
  const [age, setage] = useState(null);
  const [address, setaddress] = useState(null);
  const [registrationno, setregistrationno] = useState(null);
  const [password, setpassword] = useState(null);
  const [usertypeid, setusertypeid] = useState(null);

  const [img, setimg] = useState(profileholder);
  const [imgtosend, setimgtosend] = useState(null);
  const [imgURL, setimgURL] = useState(null);

  const [loaderstate, setloaderstate] = useState(false);

  const [AddEditState, setAddEditState] = useState(false);
  const [btnState, setbtnState] = useState(null);

  const [rolesdata, setrolesdata] = useState(null);
  const [roleid, setroleid] = useState(null);

  const input2 = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();

  //const state = location.state;

  const [state, setstate] = useState(location.state);

  useEffect(() => {
    // console.log(
    //   name,
    //   lastname,
    //   age,
    //   address,
    //   gender,
    //   validator.isEmail(email),
    //   specialization,
    //   hospitalclinic,
    //   password,
    //   registrationno,
    //   imgtosend
    // );
    if (
      name &&
      lastname &&
      age &&
      address &&
      gender &&
      validator.isEmail(email) &&
      specialization &&
      hospitalclinic &&
      password &&
      registrationno &&
      imgtosend &&
      roleid
    ) {
      console.log("all conditions true");
      if (mobile.length == 11) setbtnState(false);
    } else {
      setbtnState(true);
    }
  }, [
    name,
    lastname,
    age,
    address,
    gender,
    mobile,
    email,
    specialization,
    hospitalclinic,
    password,
    registrationno,
    imgtosend,
    roleid,
  ]);

  async function addDoctorApi(img) {
    setloaderstate(true);
    console.log(
      name,
      lastname,
      age,
      address,
      gender,
      mobile,
      email,
      specialization,
      hospitalclinic,
      imgURL
    );

    var data = new FormData();
    data.append("first_name", name);
    data.append("last_name", lastname);
    data.append("phone_number", mobileformat);
    data.append("email", email);
    data.append("gender", gender);
    data.append("age", age);
    data.append("specialization", specialization);
    data.append("serving_hospital", hospitalclinic);
    data.append("address", address);
    data.append("registration_number", registrationno);
    data.append("password", password);
    data.append("doctor_image", img);
    data.append("user_id", localStorage.getItem("userid"));
    data.append("role_id", roleid);

    var config = {
      method: "post",
      url: baseurl + "AddDoctor",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setloaderstate(false);
        console.log(response.data.message);
        swal(response.data.message).then(() => navigate("/doctorList"));
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
      setmobile(message);
      setmobileformat(addformat(message));
    }
  }

  function addformat(val) {
    const replaced = "92" + val.substring(1);
    return replaced;
  }

  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      //console.log("ecent name", event.target.name);
      //console.log("img", img);
      //console.log("url", URL.createObjectURL(img));
      setimg(URL.createObjectURL(img));

      getBase64(img)
        .then((result) => {
          img["base64"] = result;
          var base64result = result.split(",")[1];
          setimgtosend(base64result);
        })
        .catch((err) => {
          console.log(err);
        });

      // if (event.target.name === "profile") {
      //   setprofile(URL.createObjectURL(img));
      // }
    }
  }

  async function uploadImg() {
    setloaderstate(true);
    var data = JSON.stringify({
      image: imgtosend,
      type: "Doctors",
    });

    var config = {
      method: "post",
      url: baseurl + "UploadImage",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        setloaderstate(false);
        console.log(res.data.data.image_path);
        setimgURL(res.data.data.image_path);
        console.log("state", state);
        updateDoc(res.data.data.image_path);
      })
      .catch(function (error) {
        setloaderstate(false);
        console.log(error);
      });
  }

  function getBase64(file) {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object

        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  }

  const [editstate, seteditstate] = useState(false);

  const [docid, setdocid] = useState(null);

  useEffect(() => {
    // console.log("state from router is", new Date(state.visitDate), state);
    // if (state) {
    // }
    getRoleTypes();
    getUserData();
  }, []);

  async function getRoleTypes() {
    var config = {
      method: "get",
      url: baseurl + "ListofRoles",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.roles);
        setrolesdata(res.data.data.roles);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getUserData() {
    var data = JSON.stringify({
      user_id: localStorage.getItem("userid"),
    });

    var config = {
      method: "post",
      url: baseurl + "EditUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if (res.data.success == "true") {
          setdocid(res.data.data.doctor_id);
          setname(res.data.data.first_name);
          setlastname(res.data.data.last_name);
          if (res.data.data.phone_number !== "") {
            setmobile(parseInt(res.data.data.phone_number));
            setmobileformat(parseInt(res.data.data.phone_number));
          }
          setemail(res.data.data.email);
          setspecialization(res.data.data.specialization);
          sethospitalclinic(res.data.data.serving_hospital);
          setgender(res.data.data.gender);

          setusertypeid(res.data.data.usertype_id);

          setroleid(res.data.data.role_id);

          setage(res.data.data.age);
          setaddress(res.data.data.address);
          setregistrationno(res.data.data.registration_number);
          if (
            res.data.data.doctor_image !== "null" ||
            res.data.data.doctor_image !== "undefined" ||
            res.data.data.doctor_image !== ""
          ) {
          } else {
            setimgURL(res.data.data.doctor_image);
            setimg(res.data.data.doctor_image);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateDoc(img) {
    var data = new FormData();
    data.append("user_id", localStorage.getItem("userid"));
    data.append("first_name", name);
    data.append("last_name", lastname);
    data.append("phone_number", mobileformat);
    data.append("email", email);
    data.append("gender", gender);
    data.append("age", age);
    data.append("address", address);
    data.append("role_id", roleid);
    data.append("user_type_id", usertypeid);

    var config = {
      method: "post",
      url: baseurl + "UpdateUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data);
        swal(res.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editbtnFunc() {
    if (imgURL == null) {
      uploadImg();
    } else {
      updateDoc();
    }
  }

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        <SideNav />
        <section class="content-section">
          {loaderstate ? (
            <>
              <div className="gifloader">
                <img src={spinnericon} alt="" />
              </div>
            </>
          ) : (
            <>
              <div class="container">
                <div class="add-patient-db">
                  <div class="row justify-content-center">
                    <div class="col-md-10">
                      <div class="form-holder">
                        <form id="doctor-profile">
                          <div class="row">
                            <h3>User Profile Edit</h3>

                            <div className="col-md-12 text-center">
                              <div className="form-group doctor-dp">
                                <input
                                  type="file"
                                  ref={input2}
                                  onChange={(e) => {
                                    setimgURL(null);
                                    onImageChange(e);
                                  }}
                                />
                                <a
                                  href="#"
                                  className="img-holder"
                                  onClick={(e) => input2.current.click()}
                                >
                                  <img src={img} alt="" />
                                  <i class="fas fa-camera"></i>
                                </a>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Name"
                                  name="name"
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                  required
                                />
                                <label for="" class="absolute-label">
                                  Name
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Last Name"
                                  name="lastname"
                                  value={lastname}
                                  onChange={(e) => setlastname(e.target.value)}
                                  required
                                />
                                <label for="" class="absolute-label">
                                  Last Name
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="mobilenum"
                              value={mobile}
                              required
                              onChange={(e) => handleMobChange(e)}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="03XXXXXXXXX"
                              maxLength={11}
                            />
                            <label for="" class="absolute-label">
                              Mobile Number
                            </label>
                          </div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Email"
                              //name="email"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                              required
                            />
                            <label for="" class="absolute-label">
                              Email
                            </label>
                          </div>

                          <div class="form-group">
                            <select
                              name="sex"
                              id=""
                              value={gender}
                              className="custom-select"
                              onChange={(e) => setgender(e.target.value)}
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              name="doctor-age"
                              placeholder="Age"
                              required
                              value={age}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => setage(e.target.value)}
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
                              name="doctor-address"
                              placeholder="Address"
                              required
                            />
                            <label for="" class="absolute-label">
                              Address
                            </label>
                          </div>
                          <div class="btn-holder mt-md-5">
                            <button
                              class="submit btn btn-add"
                              type="button"
                              onClick={editbtnFunc}
                            >
                              Save
                            </button>
                          </div>
                          {/* {editstate ? (
                            <div class="btn-holder mt-md-5">
                              <button
                                class="submit btn btn-add"
                                type="button"
                                onClick={editbtnFunc}
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div class="btn-holder mt-md-5">
                              <button
                                class="submit btn btn-add"
                                type="button"
                                onClick={uploadImg}
                                disabled={btnState}
                              >
                                Save
                              </button>
                              <a href="#" class="btn-cancel">
                                Cancel
                              </a>
                            </div>
                          )} */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
