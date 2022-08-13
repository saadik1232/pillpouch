import React from "react";
import FullCalendar, { CalendarApi, formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId, formatDateMy } from "./event-utils";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Tooltip } from "bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

let tooltipInstance = null;

export default function CalendarComp({ data, Cstate }) {
  const navigate = useNavigate();

  const state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const calendaref = useRef(null);

  function handleclick(data) {
    // console.log("on event click", data);
    // console.log("time start of event", data.event.start);
    // console.log("view of calendar", data.view.type);
    // let api = calendaref.current.getApi();
    // api.gotoDate("2022-07-15");
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
    navigate("/patientdetail", {
      state: {
        id: data.event.extendedProps.id,
        fromdashboard: {
          view: data.view.type,
          date: data.event.start,
        },
      },
    });
    // swal(data.event.extendedProps.description);
  }

  const [appdata, setappdata] = useState(null);

  useEffect(() => {
    console.log("the data in react calendar compt", data);
    let dummydata = [];
    data.map((ent) => {
      let element = {
        id: ent.apointment_id,
        title: ent.patient_name,
        //start:  "2022-06-24T12:30:00",
        start: formatDateMy(ent.date) + "T" + ent.time,
        className: ent.status,
        overlap: true,
        extendedProps: {
          description: ent.patient_name + " " + ent.date + " " + ent.time,
          time: formatDateMy(ent.date),
          id: ent.patient_user_id,
        },
      };
      dummydata.push(element);
    });
    setappdata(dummydata);

    if (Cstate) {
      console.log(
        "the state in dasboard calendarcomp",
        Cstate,
        formatDateMy(Cstate.viewdata.date)
      );

      setstateforbtns({
        [Cstate.viewdata.view == "timeGridDay" ? "custom2active" : "custom2"]: {
          text: "Day",
          click: (e) => {
            let api = calendaref.current.getApi();
            api.changeView("timeGridDay");
            setcontextheight("auto");
            foractiveclassnameday();
          },
        },
        [Cstate.viewdata.view == "timeGridWeek" ? "custom1active" : "custom1"]:
          {
            text: "Week",
            click: (e) => {
              let api = calendaref.current.getApi();
              api.changeView("timeGridWeek");
              setcontextheight("auto");
              foractiveclassnameweek();
            },
          },
        [Cstate.viewdata.view == "dayGridMonth" ? "custom3active" : "custom3"]:
          {
            text: "Month",
            click: (e) => {
              let api = calendaref.current.getApi();
              api.changeView("dayGridMonth");
              setcontextheight(null);
              foractiveclassnamemonth();
            },
          },
      });

      // let api = calendaref.current.getApi();
      // api.gotoDate(formatDateMy(Cstate.viewdata.date));
    }

    return () => {};
  }, []);

  const customButtons = {
    custom2: {
      text: "Day",
      classNames: "saadtest",
      click: (e) => {
        calendaref.current.querySelectorAll(".fc-button").forEach((button) => {
          if (button.innerText === "custom2") {
            button.classList.add("red-button");
          }
        });

        console.log("clicked the custom button!");
        let api = calendaref.current.getApi();
        api.changeView("timeGridDay");
        console.log(api);
        setcontextheight("auto");
        // calendaref.current.calendar.changeView("timeGridDay");
      },
    },
    custom1: {
      text: "Week",
      className: "saadtest",
      class: "saadtest",
      // icon: "fa fa-lock",
      click: (e) => {
        console.log("clicked the custom button!");
        let api = calendaref.current.getApi();
        api.changeView("timeGridWeek");
        console.log(api);
        setcontextheight("auto");
        // calendaref.current.calendar.changeView("timeGridDay");
      },
    },
    custom3: {
      text: "Month",
      className: "saadtest",
      class: "saadtest",
      // icon: "fa fa-lock",
      click: (e) => {
        console.log("clicked the custom button!");
        let api = calendaref.current.getApi();
        api.changeView("dayGridMonth");
        console.log(api);
        setcontextheight(null);
        // calendaref.current.calendar.changeView("timeGridDay");
      },
    },
  };

  const [contextheight, setcontextheight] = useState("auto");

  const [stateforbtns, setstateforbtns] = useState({
    custom2active: {
      text: "Day",
      click: (e) => {
        let api = calendaref.current.getApi();
        api.changeView("timeGridDay");
        setcontextheight("auto");
        foractiveclassnameday();
      },
    },
    custom1: {
      text: "Week",
      click: (e) => {
        let api = calendaref.current.getApi();
        api.changeView("timeGridWeek");
        setcontextheight("auto");
        foractiveclassnameweek();
      },
    },
    custom3: {
      text: "Month",
      click: (e) => {
        let api = calendaref.current.getApi();
        api.changeView("dayGridMonth");
        setcontextheight(null);
        foractiveclassnamemonth();
      },
    },
  });

  useEffect(() => {
    setbtnnames(Object.keys(stateforbtns));
    return () => {};
  }, [stateforbtns]);

  function foractiveclassnameday() {
    setstateforbtns({
      custom2active: {
        text: "Day",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridDay");
          setcontextheight("auto");
          foractiveclassnameday();
        },
      },
      custom1: {
        text: "Week",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridWeek");
          setcontextheight("auto");
          foractiveclassnameweek();
        },
      },
      custom3: {
        text: "Month",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("dayGridMonth");
          setcontextheight(null);
          foractiveclassnamemonth();
        },
      },
    });
  }

  function foractiveclassnameweek() {
    setstateforbtns({
      custom2: {
        text: "Day",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridDay");
          setcontextheight("auto");
          foractiveclassnameday();
        },
      },
      custom1active: {
        text: "Week",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridWeek");
          setcontextheight("auto");
          foractiveclassnameweek();
        },
      },
      custom3: {
        text: "Month",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("dayGridMonth");
          setcontextheight(null);
          foractiveclassnamemonth();
        },
      },
    });
  }

  function foractiveclassnamemonth() {
    setstateforbtns({
      custom2: {
        text: "Day",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridDay");
          setcontextheight("auto");
          foractiveclassnameday();
        },
      },
      custom1: {
        text: "Week",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("timeGridWeek");
          setcontextheight("auto");
          foractiveclassnameweek();
        },
      },
      custom3active: {
        text: "Month",
        click: (e) => {
          let api = calendaref.current.getApi();
          api.changeView("dayGridMonth");
          setcontextheight(null);
          foractiveclassnamemonth();
        },
      },
    });
  }

  const [btnnames, setbtnnames] = useState(null);

  // console.log(Object.keys(stateforbtns));

  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body",
      });

      tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };

  return (
    <>
      {appdata && (
        <FullCalendar
          ref={calendaref}
          customButtons={stateforbtns}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialDate={Cstate ? formatDateMy(Cstate.viewdata.date) : new Date()}
          headerToolbar={{
            left: "prev today next",
            // center:
            //   "timeGridDay,timeGridWeek,dayGridMonth custom2 custom1 custom3",
            center: `${btnnames[0]} ${btnnames[1]} ${btnnames[2]}`,
            // center: "custom2 custom1 custom3",
            right: "title",
          }}
          // initialView="dayGridMonth"
          // dayMaxEvents={true}
          // weekends={state.weekendsVisible}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            //meridiem: "short",
          }}
          contentHeight={contextheight}
          textEscape={true}
          initialEvents={appdata}
          eventClick={handleclick}
          initialView={Cstate ? Cstate.viewdata.view : "timeGridDay"}
          editable={false}
          selectable={false}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}

          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // select={this.handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          // eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed

          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
        />
      )}
    </>
  );
}
