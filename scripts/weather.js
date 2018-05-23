var tempC;
var unit = 'C';
$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = "lat="+position.coords.latitude;
      var lon = "lon="+position.coords.longitude;
      console.log(lat);
      console.log(lon);
      var urlstring = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;
      apiCall(urlstring);
    });
  } else {
    document.getElementById("output").innerHTML  = ("Geolocation not supported by browser");
  }
  $("#tempUnit").click(function() {
    if(unit == 'C') {
      unit = 'F';
      $("#tempUnit").text(unit);
      var tempF = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(tempF);
    } else {
      unit = 'C';
      $("#tempUnit").text(unit);
      $("#temp").text(tempC);
    }
  });
});

function apiCall(urlstring) {
  $.ajax({
    url: urlstring, success: function(result) {
      console.log(result);
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      $("#weather").text(result.weather[0].main);
      tempC = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(tempC);
      $("#tempUnit").text(unit);
      var icon ="#" + (result.weather[0].main).toLowerCase();
      console.log(icon);
      $(icon).removeClass("hide");
    }
  });
}