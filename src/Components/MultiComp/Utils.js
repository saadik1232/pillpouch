export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export const pagesid = {
  uploadprescription: "5",
  addprescription: "6",
  doctorList: "7",
  order_pageid: "10",
  appointment: "11",
  patientlist: "12",
};

export const pagesidwithpath = [
  { id: "5", path: "/uploadedPrescription", icon: "finances" },
  { id: "6", path: "/addprescription", icon: "reviews" },
  { id: "7", path: "/doctorList", icon: "doctors" },
  { id: "10", path: "/prescriptions", icon: "messages" },
  { id: "11", path: "/appointments", icon: "appointments" },
  { id: "12", path: "/patientlist", icon: "patients" },
];
