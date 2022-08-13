import React from "react";
import Footer from "../Header/Footer";
import Header from "../Header/Header";
import howworksbanner from "../../assets/images/how-works-banner.png";
import signupappscreen from "../../assets/images/signup-appscreen.png";
import coordinateicon from "../../assets/images/coordinate-icon.png";
import coordinateic from "../../assets/images/coordinate-ic.png";
import scheduleicon from "../../assets/images/schedule-icon.png";
import scheduleic from "../../assets/images/schedule-ic.png";
import packageicon from "../../assets/images/package-icon.png";
import packageic from "../../assets/images/package-ic.png";
import headphoneic from "../../assets/images/headphone-ic.png";
import refillicon from "../../assets/images/refill-icon.png";
import deliveryicon from "../../assets/images/delivery-icon.png";
import everymonthbanner from "../../assets/images/every-month-banner.png";

export default function How_it_works() {
  return (
    <>
      <Header />

      <section class="top-banner how-it-works-banner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="text-box">
                <h1>
                  Simplify <br />
                  your life
                </h1>
                <p>
                  Pill Pouch is a full service pharmacy designed around your
                  medical needs. Now you can eliminate the hassle of keeping a
                  track of your medication, we’ve got you covered.
                </p>
                <a href="#" class="btn">
                  Apply Now
                </a>
              </div>
            </div>
            <div class="col-md-6 text-center">
              <img src={howworksbanner} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="how-works">
        <div class="container">
          <div class="section-head text-center mb-0 mb-lg-5">
            <h2 class="section-title pb-4 pb-lg-5">How it Works</h2>
          </div>
          <div class="row align-items-center">
            <div class="col-md-6 order-lg-last">
              <div class="text-box">
                <h4 class="sub-heading">GET STARTED</h4>
                <h3 class="inner-section-title">
                  You’ll need a few things to sign up
                </h3>
                <ul>
                  <li>Your list of your medications</li>
                  <li>Your doctor information</li>
                  <li>Any insurance information</li>
                  <li>Your payment method</li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <img src={signupappscreen} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="first-weeks">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6 col-md-6">
              <div class="text-box">
                <h4 class="sub-heading">YOUR FIRST TWO WEEKS</h4>
                <h3 class="inner-section-title">
                  We’ll transfer your prescriptions and set up your service
                </h3>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 d-none d-lg-block"></div>
            <div class="col-lg-4 col-md-6">
              <div class="week-card">
                <img src={coordinateicon} alt="" />
                <img src={coordinateic} alt="" class="hover-show" />
                <h4>Insurance Prociders</h4>
                <p>
                  with your doctors and insurance to gather your prescriptions
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-none d-lg-block"></div>
            <div class="col-lg-4 col-md-6 mt-4 mt-lg-0">
              <div class="week-card slightly-up">
                <img src={scheduleicon} alt="" class="hover-show" />
                <img src={scheduleic} alt="" />
                <h4>We schedule</h4>
                <p>your first shipment and order your refills</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="week-card mt-lg-5 mt-4">
                <img src={packageicon} alt="" class="hover-show" />
                <img src={packageic} alt="" />
                <h4>We package</h4>
                <p>
                  We package your medication by day and time so that you never
                  miss a dose again
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="every-month">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 order-lg-last">
              <div class="text-box">
                <h3 class="inner-section-title">
                  You’ll get the meds you need every month
                </h3>
                <ul>
                  <li>
                    <img src={headphoneic} alt="" />
                    <div class="txt">
                      <h4>Pharmacy support</h4>
                      <p>day or night</p>
                    </div>
                  </li>
                  <li>
                    <img src={refillicon} alt="" />
                    <div class="txt">
                      <h4>Automatic refills</h4>
                      <p>before you need them</p>
                    </div>
                  </li>
                  <li>
                    <img src={deliveryicon} alt="" />
                    <div class="txt">
                      <h4>Free delivery</h4>
                      <p>right to your door</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-7">
              <img src={everymonthbanner} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="get-started-today">
        <div class="container text-center">
          <h2>Get started today</h2>
          <br />
          <a href="#" class="read-more">
            Sign Up
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
