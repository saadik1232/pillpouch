// import React from 'react'

// export default function AddPage() {
//   return (
//     <div>AddPage</div>
//   )
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import spinnericon from "../../assets/images/spinner.gif";
import { baseurl } from "../../Api/ApiData";
import swal from "sweetalert";

export default function AddPage() {
  const location = useLocation();
  const [state, setstate] = useState(location.state);
  const [pages, setpages] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);
  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [btnstate, setbtnstate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (title && description) {
      setbtnstate(false);
    } else {
      setbtnstate(true);
    }
  }, [title, description]);

  async function createRole() {
    setloaderstate(true);
    var data = JSON.stringify({
      title: title,
      description: description,
    });
    var config = {
      method: "post",
      url: baseurl + "CreatePage",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if ((res.data.success = "true")) {
          swal(res.data.message).then(() => navigate("/pagemanag"));
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
        <SideNav />
        <section class="content-section editrole-section">
          <div class="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="main-title">Create Page</h2>
              </div>
              <div className="col-md-6 text-right">
                <div className="btn-holder">
                  <button
                    className="btn btn-cancel"
                    onClick={(e) => navigate("/pagemanag")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-save"
                    disabled={btnstate}
                    onClick={(e) => createRole()}
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
              </div>
              <form action="">
                <div className="form-group">
                  <label htmlFor="role">Title</label>
                  <input
                    id="role"
                    placeholder="Role"
                    value={title}
                    type="text"
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    placeholder="Description"
                    value={description}
                    type="text"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    className="form-control"
                  />
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
