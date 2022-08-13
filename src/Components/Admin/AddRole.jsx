import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import SideNav from "../Header/SideNav";
import TopNav from "../Header/TopNav";
import spinnericon from "../../assets/images/spinner.gif";
import { baseurl } from "../../Api/ApiData";
import swal from "sweetalert";

export default function AddRole() {
  const location = useLocation();
  const [state, setstate] = useState(location.state);
  const [pages, setpages] = useState(null);
  const [loaderstate, setloaderstate] = useState(true);
  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [btnstate, setbtnstate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("state", state);
    getroledata();
  }, []);

  async function getroledata() {
    var config = {
      method: "get",
      url: baseurl + "ListofPermissions",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(function (res) {
        setloaderstate(false);
        console.log(res.data);
        settitle(res.data.data.title);
        setdescription(res.data.data.description);
        setpages(res.data.data.page_permissions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function selectall(status, ind) {
    //console.log(status, ind);
    let dum = [...pages];
    //console.log("test", dum);
    let per = dum.permissions;
    let new1 = [];
    for (let i = 0; i < dum[ind].permissions.length; i++) {
      var ele = dum[ind].permissions[i];
      ele.status = status;
      new1.push(ele);
    }
    dum[ind].permissions = new1;
    setpages(dum);
    //console.log(dum);
    // dum[ind]
  }

  function singleselect(status, innerindex, outerindex, title) {
    //console.log(status, innerindex, outerindex);
    let dum = [...pages];
    if (title == "Listing") {
      let ele = dum[outerindex].permissions[innerindex];
      ele.status = status;
      dum[outerindex].permissions[innerindex] = ele;
      setpages(dum);
    } else {
      let ele = dum[outerindex].permissions[innerindex];
      ele.status = status;
      dum[outerindex].permissions[innerindex] = ele;

      let ele2 = dum[outerindex].permissions[0];
      ele2.status = true;
      dum[outerindex].permissions[0] = ele2;
      setpages(dum);
    }

    console.log(dum);
  }

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
      page_permissions: pages,
    });
    var config = {
      method: "post",
      url: baseurl + "CreateRole",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    await axios(config)
      .then(function (res) {
        console.log(res.data);
        if ((res.data.success = "true")) {
          swal(res.data.message).then(() => navigate("/rollsmang"));
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
                <h2 className="main-title">Create Role</h2>
              </div>
              <div className="col-md-6 text-right">
                <div className="btn-holder">
                  <button
                    className="btn btn-cancel"
                    onClick={(e) => navigate("/rollsmang")}
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
                <div className="col-md-4 text-right">
                  {/* <span className="user-count">6 users with this role</span> */}
                </div>
              </div>
              <form action="">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
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
                <div className="roletable-holder">
                  {/* <label class="check-holder">
                      <input
                        type="checkbox"
                        name="doctor-check"
                        //checked={false}
                        onChange={(e) => {
                          console.log("test", e);
                        }}
                      />
                      Super Admin Test
                      <span class="checkmark"></span>
                    </label>
                    <ul className="checklist">
                      <li>
                        <label class="check-holder">
                          <input type="checkbox" name="listing-check" />
                          Listing
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label class="check-holder">
                          <input type="checkbox" name="add-check" />
                          Add
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label class="check-holder">
                          <input type="checkbox" name="edit-check" />
                          Edit
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label class="check-holder">
                          <input type="checkbox" name="delete-check" />
                          Delete
                          <span class="checkmark"></span>
                        </label>
                      </li>
                    </ul>
                    <hr /> */}
                  {pages &&
                    pages.map((ent, index) => (
                      <>
                        <label class="check-holder">
                          <input
                            type="checkbox"
                            name="doctor-check"
                            //checked={false}
                            checked={
                              ent.permissions.some((ent) => ent.status == true)
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              //console.log("test", e.target.checked);
                              selectall(e.target.checked, index);
                            }}
                          />
                          {ent.page_name}
                          <span class="checkmark"></span>
                        </label>
                        <ul className="checklist">
                          {/* <li>
                              <label class="check-holder">
                                <input type="checkbox" name="listing-check" />
                                Listing
                                <span class="checkmark"></span>
                              </label>
                            </li> */}
                          {ent.permissions.map((ent2, index2) => (
                            <li>
                              <label class="check-holder">
                                <input
                                  type="checkbox"
                                  name="listing-check"
                                  checked={ent2.status}
                                  onChange={(e) =>
                                    singleselect(
                                      e.target.checked,
                                      index2,
                                      index,
                                      ent2.title
                                    )
                                  }
                                />
                                {ent2.title}
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          ))}
                        </ul>
                        <hr />
                      </>
                    ))}
                </div>
              </>
            )}

            <br />
          </div>
        </section>
      </div>
    </>
  );
}
