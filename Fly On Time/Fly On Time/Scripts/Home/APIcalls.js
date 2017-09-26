
//Info is a json object containing flight information.
//This function will dynamically display the information instead of trying to manually change it all.
var displayInfo = function (info, type, index) {
    //Check that there is actually info
    if (info.length > 2) {
        var airportObj = JSON.parse(info)[0].airport;
        $('#' + type + 'Flight' + index).append('<p><ul>')
        $('#' + type + 'Flight' + index).append('<li><strong>Name</strong>: ' + airportObj.name + '</li>');
        $('#' + type + 'Flight' + index).append('<li><strong>Location</strong>: ' + airportObj.city + ', ' + airportObj.state + '</li>');
        $('#' + type + 'Flight' + index).append('<li><strong>UTC</strong>: ' + airportObj.utc + '</li>');
        $('#' + type + 'Flight' + index).append('<li><strong>Precheck</strong>: ' + airportObj.precheck + '</li>');
        $('#' + type + 'Flight' + index).append('</ul></p>')
    }
    else {
        $('#' + type + 'Flight' + index).append('<strong>Not Available</strong>')
    }
}

var displayFlightSchedule = function (info) {
    var infoObj = JSON.parse(info);
    var airport = infoObj.appendix.airports[0];
    displayWeatherInfo(airport.latitude, airport.longitude);
    $.each(infoObj.scheduledFlights, function (index, val) {

        $('#displayBox').append('<hr />');
        $('#displayBox').append('<h4>Flight Number: ' + val.flightNumber + '</h4>');
        $('#displayBox').append('<p><ul>')
        $('#displayBox').append('<li><strong>Arrival Terminal</strong>: ' + val.arrivalTerminal + '</li>');
        $('#displayBox').append('<li><strong>Departure Time</strong>: ' + val.departureTime + '</li>');
        $('#displayBox').append('<li><strong>Arrival Time</strong>: ' + val.arrivalTime + '</li>');
        $('#displayBox').append('</ul></p>');

        $('#displayBox').append('<h5>Departure Airport</h5>');
        $('#displayBox').append('<span id="dFlight' + index + '"></span>');
        getTsaCheckpoint(val.departureAirportFsCode, "d", index);

        $('#displayBox').append('<h5>Arrival Airport</h5>');
        $('#displayBox').append('<span id="aFlight' + index + '"></span>');
        getTsaCheckpoint(val.arrivalAirportFsCode, "a",index);
    })
}


var displayWeatherInfo = function (latitude, longitude) {
    var coordinates = { latitude: latitude, longitude: longitude };
    $.get("/Home/getWeatherByCoordinates", coordinates, function (data, textStatus, XQHR) {
        console.log(data);

    }).error(function (data, text) {
        console.log(data);
    });

}

var getFlightSchedule = function () {
    var airCode = $('#fsScheduleAirCode').val();
    var fn = $('#fsScheduleFN').val();
    var year = $('#fsScheduleYear').val();
    var month = $('#fsScheduleMonth').val();
    var day = $('#fsScheduleDay').val();
    var output = { airCode: airCode, fn: fn, year: year, month: month, day: day };

    $.get("/Home/getFlightSchedule", output, function (data, textStatus, XQHR) {
        console.log(data);
        displayFlightSchedule(data);


    }).error(function (data, text) {
        console.log(data);
    });

}

var getTsaCheckpoint = function (shortcodeInput, type, index) {
    $.get("/Home/getTsaCheckpoint", { shortcode: shortcodeInput }, function (data, textStatus, XQHR) {
        console.log(data);
        console.log(textStatus);
        displayInfo(data, type, index);

    }).error(function (data, text) {
        console.log(data);
    });
}



$('body').on('click', '#searchBtn', function () {
    var input = $('#shortcodeInput').val();
    getTsaCheckpoint(input);
});

$('body').on('click', '#submitBtn', function () {
    $('#displayBox').html('');
    getFlightSchedule();
});
