// import React from "react";

// export default function PageManag() {
//   return <div>PageManag</div>;
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import { baseurl } from "../../Api/ApiData";
import spinnericon from "../../assets/images/spinner.gif";
import TableComp from "../MultiComp/TableComp";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function PageManag() {
  const [loaderstate, setloaderstate] = useState(true);
  const navigate = useNavigate();

  const [columns, setcolumns] = useState([
    { dataField: "page_id", text: "ID" },
    { dataField: "title", text: "Title" },
    { dataField: "description", text: "Description" },
    { dataField: "status", text: "Status" },
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
                navigate("/editpage", { state: { id: cell.page_id } });
              }}
            ></i>
          </div>
          {/* <div href="#" className="edit-btn btn-lite">
            <i
              class="fas fa-trash-alt"
              onClick={(e) => {
                deleteFunction(cell);
              }}
            ></i>
          </div> */}
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
      page_id: cell.page_id,
    });

    var config = {
      method: "post",
      url: baseurl + "DeletePage",
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
      url: baseurl + "ListofPages",
      headers: {},
    };

    await axios(config)
      .then(function (res) {
        console.log(res.data.data.pages);
        setloaderstate(false);
        setdummydata(res.data.data.pages);

        setoptions({
          custom: true,
          totalSize: parseInt(res.data.data.pages.length),
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
        <SideNav />
        <section class="content-section">
          <div class="container">
            <div class="patient-listing">
              <div class="row mt-4">
                <div class="col-md-12">
                  <div class="patients-info">
                    <div class="row mb-3">
                      <div class="col-md-7">
                        <h2 class="main-title">Pages Management</h2>
                      </div>
                      <div class="col-md-5 text-right">
                        <button
                          class="btn btn-add-patient"
                          onClick={(e) => navigate("/addpage")}
                        >
                          Add Page
                        </button>
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
