document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var initialLocaleCode = "ko";

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],
    height: "parent",
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    defaultView: "dayGridMonth",
    defaultDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    // editable: true,
    eventLimit: true, // allow "more" link when too many events
    fixedWeekCount: false,
    locale: initialLocaleCode,
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
  });

  calendar.render();
});
