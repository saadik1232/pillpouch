import axios from "axios";
import React, { useEffect, useState } from "react";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import { baseurl } from "../../Api/ApiData";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Rolls() {
  const [loaderstate, setloaderstate] = useState(true);
  const navigate = useNavigate();

  const [columns, setcolumns] = useState([
    { dataField: "user_id", text: "ID" },
    { dataField: "name", text: "Name" },
    { dataField: "email", text: "Email" },
    // { dataField: "address", text: "Address" },
    // { dataField: "gender", text: "Gender" },
    { dataField: "role", text: "Role" },
    { dataField: "user_type", text: "User Type" },
    { dataField: "phone_number", text: "Phone Number" },
    {
      dataField: "",
      text: "",
      formatter: (e, cell, row, rowIndex, extraData) => (
        <div class="btn-holder">
          <div href="#" className="edit-btn btn-lite mr-2">
            <i
              class="fas fa-pencil-alt"
              onClick={(e) => {
                console.log("test", cell);
                navigate("/edituser", { state: { id: cell.user_id } });
              }}
            ></i>
          </div>
          <div href="#" className="edit-btn btn-lite">
            <i
              class="fas fa-trash-alt"
              onClick={(e) => {
                deleteFunction(cell);
              }}
            ></i>
          </div>
        </div>
      ),
    },
  ]);

  function deleteFunction(cell) {
    console.log("cell info", cell);
    swal("Are you sure, you want to delete?", {
      buttons: {
        Yes: "Yes",
        No: {
          text: "No",
          value: "No",
        },
      },
    }).then((value) => {
      switch (value) {
        case "Yes":
          DeleteApi(cell);
          break;

        case "catch":
          break;

        default:
          break;
      }
    });
  }

  async function DeleteApi(cell) {
    var data = JSON.stringify({
      user_id: cell.user_id,
    });

    var config = {
      method: "post",
      url: baseurl + "DeleteUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (res) {
        console.log(res);
        swal(res.data.message);
        if (res.data.success == "true") {
          getUsers();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [dummydata, setdummydata] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    var config = {
      method: "get",
      url: baseurl + "ListofUsers",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.Users);
        setloaderstate(false);
        setdummydata(res.data.data.Users);

        setoptions({
          custom: true,
          totalSize: parseInt(res.data.data.Users.length),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [options, setoptions] = useState(null);

  return (
    <>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        {/* <SideNav /> */}
        <section class="content-section">
          <div class="container">
            <div class="patient-listing">
              <div className="row">
                <div className="col-md-6"></div>
                <div class="col-md-6 text-right">
                  <button
                    class="btn btn-add-patient"
                    onClick={(e) => navigate("/adduser")}
                  >
                    Add User
                  </button>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="patients-info">
                    <div class="row mb-3">
                      <div class="col-md-7">
                        <h2 class="main-title">User Management</h2>
                      </div>
                    </div>
                    <div id="table-holder" className="roletable">
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
                              keyfield="role_id"
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
