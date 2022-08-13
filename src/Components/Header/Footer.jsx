import React from "react";
import servicemed from "../../assets/images/service-med-guy.png";

export default function Footer() {
  return (
    <div>
      <footer class="footer">
        <div class="our-service">
          <div class="container">
            <div class="service-holder">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <h2>
                    Our service is free, you only pay for your medications
                  </h2>
                </div>
                <div class="col-md-6 text-center">
                  <img src={servicemed} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-6">
              <h4 class="footer-menu-heading">Pages</h4>
              <ul class="footer-menu">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Courses</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-6">
              <h4 class="footer-menu-heading">Resources</h4>
              <ul class="footer-menu">
                <li>
                  <a href="#">Our Homes</a>
                </li>
                <li>
                  <a href="#">Member Stories</a>
                </li>
                <li>
                  <a href="#">Video</a>
                </li>
                <li>
                  <a href="#">Free Trial</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-sm-6">
              <h4 class="footer-menu-heading">Company</h4>
              <ul class="footer-menu">
                <li>
                  <a href="#">Patnerships</a>
                </li>
                <li>
                  <a href="/terms">Terms of use</a>
                </li>
                <li>
                  <a href="/privacy">Privacy</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-sm-6">
              <h4 class="footer-menu-heading social-footer">
                Find us at
                <a href="#" class="ml-5">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9943.59171207852!2d-0.017357508821976498!3d51.4600304740362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876026540ef2ca1%3A0x87aa4d6c806da306!2sLewisham%2C%20London%2C%20UK!5e0!3m2!1sen!2s!4v1631166270075!5m2!1sen!2s"
                width={"100%"}
                height={"auto"}
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
          <div class="copyright">
            <p>
              Copyright ©{" "}
              <script type="text/javascript">
                document.write(new Date().getFullYear());
              </script>{" "}
              Pill Pouch.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
