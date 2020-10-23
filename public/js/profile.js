$(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      $("#user").text("Hello " + data.name + "!");
    });
  });