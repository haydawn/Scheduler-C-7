$(document).ready(function () {
    // Function to show the current day
    function showCurrentDay() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    }
  
    // Load or initialize events array
    var events = JSON.parse(localStorage.getItem("events")) || [];
  
    // Function to color-code time blocks based on current time
    function updateTimeBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("data-hour"));
  
        // Color-code time blocks based on past, present, and future
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Event when the save button is clicked
    $(".saveBtn").on("click", function () {
      var hour = parseInt($(this).siblings(".description").attr("data-hour"));
      var text = $(this).siblings(".description").val();
  
      // Check if there's an existing event for this hour
      var existingEventIndex = events.findIndex(function (event) {
        return event.hour === hour;
      });
  
      // Update or add the event
      if (existingEventIndex !== -1) {
        events[existingEventIndex].text = text;
      } else {
        events.push({ hour: hour, text: text });
      }
  
      // Save events to local storage
      localStorage.setItem("events", JSON.stringify(events));
  
      // Update time blocks based on the current time
      updateTimeBlocks();
    });
  
  
    // Update time blocks every minute
    setInterval(updateTimeBlocks, 60000);
  });
  