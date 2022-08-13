import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../Header/TopNav";

export default function One() {
  return (
    <div>
      <div class="page-overlay"></div>
      <div class="wraper">
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
}
