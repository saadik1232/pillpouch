let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const not_converted_date = "06/24/2022"; // receiving from backend  m/d/y   and we need y/m/d
const not_converted_time = "13:00";

export function formatAMPM(date) {
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

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatDateMy(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: "All-day event",
  //   start: todayStr,
  // },
  // {
  //   id: createEventId(),
  //   title: "Timed event",
  //   start: todayStr + "T12:00:00",
  // },
  {
    id: 1234,
    title: "Test Run",
    //start:  "2022-06-24T12:30:00",
    start: formatDate(not_converted_date) + "T" + "13:00",
  },
  // {
  //   id: 1234,
  //   title: "Test Run",
  //   start: "2022-06-24T13:30:00",
  // },
  // {
  //   id: 1234,
  //   title: "Test Run",
  //   start: "2022-06-24T14:30:00",
  // },
  {
    id: 123,
    title: "doctor hospital",
    start: "2022-06-30T14:30",
    className: "saad",
  },
  {
    id: 12345,
    title: "doctor hospital 2",
    start: "2022-06-30T15:00",
    className: "saad",
  },
  {
    id: 124,
    title: "doctor hospital 2",
    start: "2022-06-30T16:00",
    className: "saad",
  },
  {
    id: 12411,
    title: "doctor hospital 2",
    start: "2022-06-30T18:00",
    className: "saad",
  },
  {
    id: 12234,
    title: "doctor hospital 2",
    start: "2022-06-24T11:00",
  },
  {
    id: 134,
    title: "doctor hospital 2",
    start: "2022-06-07T16:00",
  },
  {
    id: 1234,
    title: "doctor hospital 2",
    start: "2022-06-14T16:00",
  },
  {
    id: 1234,
    title: "doctor hospital 2",
    start: "2022-06-14T16:00",
  },
  {
    id: 114,
    title: "Doctor hospital",
    start: "2022-06-14T12:00",
  },
  {
    id: 1234,
    title: "doctor hospital 2",
    start: "2022-06-21T16:00",
  },
  {
    id: 1234,
    title: "doctor hospital 2",
    start: "2022-06-08T16:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
