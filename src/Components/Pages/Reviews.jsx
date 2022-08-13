import React from "react";
import Footer from "../Header/Footer";
import Header from "../Header/Header";

import reviewbanner from "../../assets/images/reviews-banner.png";
import customerrcmdbanner from "../../assets/images/customer-recommend-banner.png";
import review from "../../assets/images/review.png";
import review1 from "../../assets/images/review1.png";
import review2 from "../../assets/images/review2.png";
import review3 from "../../assets/images/review3.png";
import review4 from "../../assets/images/review4.png";
import review5 from "../../assets/images/review5.png";

export default function Reviews() {
  return (
    <>
      <Header />

      <section class="top-banner reviews-banner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="text-box">
                <h1>Reviews</h1>
                <p>
                  Watch how Pill Pouch has helped people break free from the
                  daily hassle of managing their medication.
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <img src={reviewbanner} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="customer-recommend">
        <div class="container">
          <div class="recommend-holder">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="text-box">
                  <h4 class="sub-heading">CUSTOMER RECOMMENDED</h4>
                  <h3 class="inner-section-title">People love Pill Pouch</h3>
                  <p>
                    Our customers rate our service higher than the average
                    pharmacy.
                  </p>
                  <p class="simple-note">Based on Net Promoter Score</p>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <img src={customerrcmdbanner} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="customers-say">
        <div class="container">
          <div class="section-head text-center mb-lg-5">
            <h2 class="section-title pb-5">What our customers say</h2>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <div class="review-box">
                <img src={review} alt="" />
                <h3 class="title">Marguerite</h3>
                <h4 class="title-location">Cleveland, OH</h4>
                <p>
                  If I need something in a hurry, they make sure i receive it in
                  the next morning shipment!
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-box">
                <img src={review1} alt="" />
                <h3 class="title">Joyce</h3>
                <h4 class="title-location">Toms River, KY</h4>
                <p>
                  Pill Pouch went the extra mile to check on my insurance being
                  changed and they always send my meds on time.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-box">
                <img src={review2} alt="" />
                <h3 class="title">Rita</h3>
                <h4 class="title-location">Benson, AZ</h4>
                <p>
                  I know that I’m taking the correct medication at the correct
                  time. Amazing customer service!
                </p>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col-md-4">
              <div class="review-box">
                <img src={review3} alt="" />
                <h3 class="title">Marguerite</h3>
                <h4 class="title-location">Cleveland, OH</h4>
                <p>
                  If I need something in a hurry, they make sure i receive it in
                  the next morning shipment!
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-box">
                <img src={review4} alt="" />
                <h3 class="title">Joyce</h3>
                <h4 class="title-location">Toms River, KY</h4>
                <p>
                  Pill Pouch went the extra mile to check on my insurance being
                  changed and they always send my meds on time.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="review-box">
                <img src={review5} alt="" />
                <h3 class="title">Rita</h3>
                <h4 class="title-location">Benson, AZ</h4>
                <p>
                  I know that I’m taking the correct medication at the correct
                  time. Amazing customer service!
                </p>
              </div>
            </div>
          </div>
          <div class="text-center mt-lg-5 mt-4">
            <a href="#" class="view-all">
              View All
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
