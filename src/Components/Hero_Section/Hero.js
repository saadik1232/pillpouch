import React from "react";
import sortmedsbanner from "../../assets/images/sort-meds-banner.jpg";
import medsbottlebanner from "../../assets/images/meds-bottle-banner.png";
import automaticrefills from "../../assets/images/automatic-refills.png";
import btssupport from "../../assets/images/bts-support.png";
import inoneplace from "../../assets/images/in-oneplace.png";
import rightdosebanner from "../../assets/images/right-dose-banner.png";
import verifiedicon from "../../assets/images/verified-icon.png";
import servicemedguy from "../../assets/images/service-med-guy.png";
import Header from "../Header/Header";
import Footer from "../Header/Footer";

export default function Hero() {
  return (
    <>
      <Header />

      <section className="hero-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-7">
              <div className="text-box">
                <h3 className="section-subtitle">Your medication,</h3>
                <h1>in handy pouches, delivered to your door for free</h1>
                <p>
                  “A revolutionary product that makes life easier and simpler
                  for those on repeat prescriptions”. TV's Dr Ahsan Zubair
                </p>
                <a href="#" className="btn">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sort-meds">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-last">
              <div className="text-box">
                <h2 className="section-title">
                  We’ll sort your meds by date and time
                </h2>
                <p>
                  Get your best class and gain the great thing from the best and
                  well qualified experienced teachers all over the world and get
                  shinny. We are a unique training provider willing to give you
                  all the skills and experience you need to fulfil your future
                  career
                </p>
                <a href="" className="read-more">
                  Read more
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img src={sortmedsbanner} />
            </div>
          </div>
        </div>
      </section>

      <section className="meds-bottle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="text-box">
                <h2 className="section-title">
                  Your medication sorted by date and time
                </h2>
                <p>No more sorting the pills or worrying </p>
                <a href="#" className="text-link">
                  Visit Pill Pouch Pharmacy
                </a>
              </div>
            </div>
            <div className="col-lg-7 text-center">
              <img src={medsbottlebanner} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="full-service-home mb-4">
        <div className="container">
          <div className="section-head text-center mb-4 mb-lg-5">
            <h3 className="section-subtitle">Full Service</h3>
            <h2 className="section-title">A new kind of care</h2>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="service-home-cards">
                <img src={automaticrefills} alt="" />
                <h4>Automatic refills</h4>
                <p>
                  We monitor and manage your refills with your doctors so you
                  always have the medications you need.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="service-home-cards">
                <img src={btssupport} alt="" />
                <h4>Behind-the-scenes support</h4>
                <p>
                  We work directly with your doctors and insurance to save you
                  time and hassle.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="service-home-cards">
                <img src={inoneplace} alt="" />
                <h4>Everything in one place</h4>
                <p>
                  We organize all your medication, billing, and prescription
                  details for easy access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="right-dose pt-lg-5">
        <div className="container">
          <div className="section-head text-center mb-lg-5">
            <h2 className="section-title mb-2">
              The Right Dose at the Right Time, Every Time.
            </h2>
            <h3 className="pb-5">
              It is challenging to manage multiple medications for yourself or a
              loved one.
            </h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src={rightdosebanner} alt="" />
            </div>
            <div className="col-md-6">
              <div className="text-box">
                <h3>There's an easier way with Pill Pouch.</h3>
                <ul>
                  <li>
                    <img src={verifiedicon} alt="" />
                    <div className="text">
                      <h4>Labeled & Sorted</h4>
                      <p>
                        Your medication is delivered each month in easy-to-open
                        packets sorted by dose.
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src={verifiedicon} alt="" />
                    <div className="text">
                      <h4>Never Miss a Dose Again</h4>
                      <p>
                        Following your doctor’s treatment plan shouldn’t be a
                        chore, and now it isn’t.
                      </p>
                    </div>
                  </li>
                  <li>
                    <img src={verifiedicon} alt="" />
                    <div className="text">
                      <h4>Always Up-to-Date</h4>
                      <p>
                        We work with your doctors to keep your prescriptions
                        refilled.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
