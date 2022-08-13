import React from "react";
import Footer from "../Header/Footer";
import Header from "../Header/Header";

import pricingbanner from "../../assets/images/pricing-banner.png";
import firstaidkit from "../../assets/images/first-aid-kit-ic.png";
import capsuleic from "../../assets/images/capsule-ic.png";
import paymentmethodic from "../../assets/images/payment-method-ic.png";
import paymentmethodichover from "../../assets/images/payment-method-ic-hover.png";
import billingic from "../../assets/images/billing-ic.png";
import billingichover from "../../assets/images/billing-ic-hover.png";
import informationic from "../../assets/images/information-ic.png";
import informationichover from "../../assets/images/information-ic-hover.png";

export default function Pricing() {
  return (
    <>
      <Header />

      <section class="top-banner pricing-banner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="text-box">
                <h1>
                  Pay your meds, <br />
                  not for your shipping
                </h1>
                <p>We take care of the rest.</p>
              </div>
            </div>
            <div class="col-md-6 text-center">
              <img src={pricingbanner} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="free-shipping">
        <div class="section-head text-center mb-lg-5 mb-0">
          <h2 class="section-title pb-5">
            Our services and shipping are absolutely free
          </h2>
        </div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5">
              <h3>You’re only responsible for:</h3>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="pricing-card">
                <img src={firstaidkit} alt="" />
                <h4>Your monthly medications</h4>
                <p>
                  You’ll pay your insurance copay or any out-of-pocket expenses
                  (if applicable).
                </p>
                <br />
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="pricing-card">
                <img src={capsuleic} alt="" />
                <h4>Any vitamins and over-the-counter meds</h4>
                <p>
                  You’ll pay for any non-prescription medications you add to
                  your service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="flexible-payment">
        <div class="container">
          <div class="section-head text-center mb-lg-5 mb-0">
            <h2 class="section-title">Very Flexible payment options</h2>
            <h3>Pay for your medication in a way that works for you.</h3>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6">
              <div class="payment-card">
                <img src={paymentmethodic} alt="" />
                <img src={paymentmethodichover} alt="" class="show-hover" />
                <h4>Pick your payment method</h4>
                <p>
                  You can use a credit card, online fund transfer or any digital
                  wallet.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="payment-card">
                <img src={billingic} alt="" />
                <img src={billingichover} alt="" class="show-hover" />
                <h4>Select Your Billing Date</h4>
                <p>
                  Pay on a specific day of the month, or anytime we send your
                  meds.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="payment-card">
                <img src={informationic} alt="" />
                <img src={informationichover} alt="" class="show-hover" />
                <h4>Review your information anytime</h4>
                <p>
                  Easily access your bill or payment history from any device.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
