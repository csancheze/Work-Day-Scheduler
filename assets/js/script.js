var datetime = null,
        date = null;

var dayCalendar = [
    {
        hour: "09",
        event: "",
    },
    {
        hour: "10",
        event: "",
    },
    {
        hour: "11",
        event: "",
    },
    {
        hour: "12",
        event: "",
    },
    {
        hour: "13",
        event: "",
    },
    {
        hour: "14",
        event: "",
    },
    {
        hour: "15",
        event: "",
    },
    {
        hour: "16",
        event: "",
    },
    {
        hour: "17",
        event: "",
    }
]
var calendar = $("#calendar");
var hourSection;
var hourDiv;
var eventDiv;
var timedColorResult ="grey";
var restoredCalendarItem;
var textColor = "text-dark"
var clearButton = $("#clear")

clearButton.on("click",function(event){
    event.preventDefault();
    localStorage.clear();
    setCalendar();
})


//Render the Calendar
function setCalendar() {
    calendar.html("");
    for (i= 0; i < dayCalendar.length; i++) {
        timedColor();
        //get storage items
        var oldCalendarItem= (localStorage.getItem("storedCalendarItem"+i)) || "[]"
        if (oldCalendarItem == "[]") {
            restoredCalendarItem = dayCalendar[i]
        } else {
        restoredCalendarItem = JSON.parse(oldCalendarItem)}
        hourSection = $("<section>")
        .addClass("row mx-1 mx-md-5 shadow mb-1")
        hourDiv = $("<div>").text(dayCalendar[i].hour)
        .addClass("col-2 col-md-1  bg-dark text-light shadow ")
        eventDiv = $("<div>").text(restoredCalendarItem.event || "Enter event or task")
        .addClass(" task-space col-8 col-md-10 " + textColor)
        .attr('contenteditable', 'true')
        .css("background-color", timedColorResult)
        eventDiv.on("click", function(event){
            event.preventDefault();
            $(event.target).text("");})
       
        var saveDiv = $("<div>")
        .text("💾")
        .addClass("col-2 col-md-1 btn btn-info py-3")
        //save button for each hour
        saveDiv.on("click",function(event){
                event.preventDefault();
                var newInput = $(event.target).prev().text()
                console.log(newInput)
                $(event.target).prev().text(newInput)
                x = parseInt($(event.target).siblings("div:first").text()) - 9
                var newEvent = {hour:x+9,event:newInput}
                localStorage.setItem("storedCalendarItem"+x, JSON.stringify(newEvent))
        })
        hourSection.append(hourDiv,eventDiv,saveDiv)
        calendar.append(hourSection);
        //save storage items
        localStorage.setItem("storedCalendarItem"+i, JSON.stringify(restoredCalendarItem))
    }
    
}

//Change color boxes with time
function timedColor() {
    var hora = parseInt(dayCalendar[i].hour)
    var horaNow = parseInt(moment().format("HH"))
    console.log(horaNow)
    if (hora < horaNow) {
        timedColorResult = "lightgray"
        textColor = "text-muted"
    } else if (hora == horaNow) {
        timedColorResult = "lightgreen"
        textColor = "text-dark"
    }else {
        timedColorResult = "lightblue"}
}


setCalendar();

//Clock 
var update = function () {
    date = moment()
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    datetime.addClass("text-success")
    //Refresh every hour for colors
    var currentMinutes = (date.format("mm:ss"))
    if (currentMinutes == "03:00") { 
        setCalendar();
        console.log("hola")
    }
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});

