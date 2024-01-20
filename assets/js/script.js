    // Function to show the current day
    function showCurrentDay() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    }
    showCurrentDay();

    // Retrieve saved events from local storage or show an empty array
    var events = JSON.parse(localStorage.getItem("events")) || [];

    // Function to color-code time blocks 
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();
    
        $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("data-hour"));
    
        if (blockHour < currentHour) {
            $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
        });
    }
    
   // When the save button is clicked
   $(".saveBtn").on("click", function () {
    var hour = parseInt($(this).siblings(".description").attr("data-hour"));
    var text = $(this).siblings(".description").val();

    if (existingEventIndex !== -1) {
    events[existingEventIndex].text = text;
    } else {
    events.push({ hour: hour, text: text });
    }

    // Save events to local storage
    localStorage.setItem("events", JSON.stringify(events));
    
    });