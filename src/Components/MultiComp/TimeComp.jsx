import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function TimeComp({ settimeformated }) {
  const [startTime, setstartTime] = useState(new Date());
  //const [timeformated, settimeformated] = useState(null);

  useEffect(() => {
    //console.log("time", formatAMPM(startTime));
    //settimeformated(formatAMPM(startTime));
    settimeformated(formatAMPM(startTime));
  }, [startTime]);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // console.log("hours and minutes", hours, minutes);
    // var ampm = hours >= 12 ? "pm" : "am";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    let hoursformat = hours <= 9 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    //var strTime = hoursformat + ":" + minutes + " " + ampm;
    // var strTime = hoursformat + ":" + minutes;
    var strTime = hoursformat + ":" + minutes;
    return strTime;
  }

  return (
    <>
      <DatePicker
        selected={startTime}
        onChange={(date) => setstartTime(date)}
        //showTimeSelect
        className="form-control"
        showTimeSelectOnly
        timeInputLabel="Time:"
        dateFormat="h:mm aa"
        showTimeInput
      />
    </>
  );
}
