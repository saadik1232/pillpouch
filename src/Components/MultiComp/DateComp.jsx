import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function DateComp({ setformatdate }) {
  const [startDate, setStartDate] = useState(new Date());
  //const [dateformated, setdateformated] = useState(null);

  useEffect(() => {
    console.log("date", formatDate(startDate));
    //setdateformated(formatDate(startDate));
    setformatdate(formatDate(startDate));
  }, [startDate]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        className="form-control"
      />
    </>
  );
}
