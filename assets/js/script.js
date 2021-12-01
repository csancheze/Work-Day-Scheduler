var datetime = null,
        date = null;

var update = function () {
    date = moment()
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});

var dayCalendar = [
    {
        hour: "9:00",
        event: "",
    },
    {
        hour: "10:00",
        event: "",
    },
    {
        hour: "11:00",
        event: "",
    },
    {
        hour: "12:00",
        event: "",
    },
    {
        hour: "13:00",
        event: "",
    },
    {
        hour: "14:00",
        event: "",
    },
    {
        hour: "15:00",
        event: "",
    },
    {
        hour: "16:00",
        event: "",
    },
    {
        hour: "17:00",
        event: "",
    }
]
var calendar = $("#calendar")

for (i= 0; i < dayCalendar.length; i++) {
    var hourSection = $("<section>").addClass("row mx-1 mx-md-5")
    var hourDiv = $("<div>").text(dayCalendar[i].hour).addClass("col-1")
    var eventDiv = $("<div>").text(dayCalendar[i].event || "Enter event or task").addClass("task-space col-10 text-muted")
    var saveDiv = $("<div>").text("💾").addClass("col-1")
    hourSection.append(hourDiv,eventDiv,saveDiv)
    calendar.append(hourSection);
}