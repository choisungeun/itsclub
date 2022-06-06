document.addEventListener("DOMContentLoaded", function () {
  var initialLocaleCode = "ko";

  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    dateClick: function () {
      console.log("a day has been clicked!");
    },
    headerToolbar: {
      left: "prevYear,prev,next,nextYear today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialDate: new Date(),
    locale: initialLocaleCode,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    nowIndicator: true,
    dayMaxEvents: true, // allow "more" link when too many events
    fixedWeekCount: false,
    events: {
      url: "/calendar",
      method: "POST",
      extraParams: {
        custom_param1: "something",
        custom_param2: "somethingelse",
      },
      failure: function () {
        alert("there was an error while fetching events!");
      },
    },
    eventDrop: function (info) {
      alert(
        info.event.title + " was dropped on " + info.event.start.toISOString()
      );

      if (!confirm("Are you sure about this change?")) {
        info.revert();
      }
    },
    eventResize: function (info) {
      alert(info.event.title + " end is now " + info.event.end.toISOString());

      if (!confirm("is this okay?")) {
        info.revert();
      }
    },
  });

  calendar.render();
});
