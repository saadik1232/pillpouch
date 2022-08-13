import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { baseurl } from "../../Api/ApiData";
import Header_blank from "../Header/Header_blank";
import { useDispatch } from "react-redux";
import { setlogindataaction, setpassaction } from "../../Store/LoginReducer";

export default function Signin() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function apicall(event) {
    event.preventDefault();
    console.log(email, password);
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: baseurl + "SignIn",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    if (email.length > 0 && password.length > 0) {
      await axios(config)
        .then(function (res) {
          console.log(res.data);
          let path = res.data.data;
          dispatch(setlogindataaction(path));
          dispatch(setpassaction(password));

          if (res.data.success == "true") {
            localStorage.setItem("usertype_id", res.data.data.usertype_id);
            localStorage.setItem("userid", res.data.data.user_id);
            localStorage.setItem("username", res.data.data.name);
            localStorage.setItem("img", res.data.data.image);
            localStorage.setItem("special", res.data.data.specialization);
            navigate("/dashboard");
          } else {
            swal(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const [btnstate, setbtnstate] = useState(true);

  useEffect(() => {
    if (email && password) {
      setbtnstate(false);
    } else {
      setbtnstate(true);
    }
  }, [email, password]);

  return (
    <>
      <Header_blank />

      <section class="signup">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
              <div class="section-head text-center mb-lg-5 mb-4">
                <h2 class="section-title">Sign in</h2>
                <h4 class="pb-lg-5 pb-0">
                  {" "}
                  Already have an account? <a href="#">Log In </a>
                </h4>
              </div>

              <div class="form-holder">
                <div id="signin-form">
                  <form onSubmit={apicall}>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <input
                            type="email"
                            placeholder="Email"
                            class="form-control"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                          />
                          <label for="" class="absolute-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <input
                            type="password"
                            placeholder="Password"
                            class="form-control"
                            required
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                          />
                          <label for="" class="absolute-label">
                            Password
                          </label>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <button
                            class="submit btn btn-signup"
                            type="submit"
                            disabled={btnstate}
                            //onClick={apicall}
                          >
                            Sign In
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="bottom-terms text-center">
                <p>
                  * By signing up, you agree to <a href="#">our Terms of Use</a>{" "}
                  and to receive Medipack emails & updates and acknowledge that
                  you read our <a href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
