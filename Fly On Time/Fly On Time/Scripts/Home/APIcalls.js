

//#region API CALLS
var displayWeatherInfo = function (latitude, longitude, type, index) {
    var coordinates = { latitude: latitude, longitude: longitude };
    $.get("/Home/getWeatherByCoordinates", coordinates, function (data, textStatus, XQHR) {
        var weatherObj = JSON.parse(data);
        var weatherCondObj = weatherObj.weather[0];
        var temperatureObj = weatherObj.main;

        $('#' + type + 'Weather' + index).append(weatherCondObj.main);
        $('#' + type + 'Temp' + index).append(temperatureObj.temp);


    }).error(function (data, text) {
        console.log(data);
    });

}


var getFlightStatus = function (input, type, index) {
    $.get("/Home/getFlightStatus", input, function (data, textStatus, XQHR) {
        console.log("Flight status: " + data);
        var jsonData = JSON.parse(data);

        displayStatusInfo(jsonData.flightStatuses[0], type, index);

    }).error(function (data, text) {
        console.log(data);
    });
}


var getFlightSchedule = function () {
    var airCode = $('#fsScheduleAirCode').val();
    var fn = $('#fsScheduleFN').val();
    var fullDate = $('#fsDate').val();
    var month = fullDate.substr(0, 2);
    var day = fullDate.substr(3, 2);
    var year = fullDate.substr(6, 4); 
    var output = { airCode: airCode, fn: fn, year: year, month: month, day: day };

    $.get("/Home/getFlightSchedule", output, function (data, textStatus, XQHR) {
        constructLayout(data, output);


    }).error(function (data, text) {
        console.log(data);
    });

}

var getTsaCheckpoint = function (shortcodeInput, type, index) {
    $.get("/Home/getTsaCheckpoint", { shortcode: shortcodeInput }, function (data, textStatus, XQHR) {
        displayInfo(data, type, index);

    }).error(function (data, text) {
        console.log(data);
    });
}
//#endregion 

//#region DISPLAY FUNCTIONS
var constructLayout = function (flights, flightInfo) {
    var flightObj = JSON.parse(flights);
    var departureAirport = flightObj.appendix.airports[0];
    var arrivalAirport = flightObj.appendix.airports[1];

    $.each(flightObj.scheduledFlights, function (index, val) {
        //$('#displayBox').append(
        //    '<div class="panel panel-default">' +
        //        '<div class="panel-heading">' +
        //            '<h3 class="panel-title">Flight Number: ' + val.flightNumber + '</h3>' +
        //        '</div>' +
        //        '<div class="panel-body">' +
        //            '<h5>Departure Airport</h5>' +
        //            '<span id="dFlight' + index + '"><ul>' +
        //                '<li id="dName' + index + '"><strong>Name: </strong></li>' +
        //                '<li id="dLoc' + index + '"><strong>Location: </strong></li>' +
        //                '<li><strong>Departure Time</strong>: ' + val.departureTime + '</li>' +
        //                '<li id="dTime' + index + '"><strong>UTC: </strong></li>' +
        //                '<li id="dGate' + index + '"><strong>Gate: </strong></li>' +
        //                '<li id="dWeather' + index + '"><strong>Weather: </strong></li>' +
        //                '<li id="dTemp' + index + '"><strong>Temperature: </strong></li>' +
        //                '<li id="dPrecheck' + index + '"><strong>Security Precheck: </strong></li>' +
        //            '</ul ></span >' +
        //            '<h5>Arrival Airport</h5>' +
        //            '<span id="aFlight' + index + '"><ul>' +
        //                '<li id="aName' + index + '"><strong>Name: </strong></li>' +
        //                '<li id="aLoc' + index + '"><strong>Location: </strong></li>' +
        //                '<li><strong>Arrival Time</strong>: ' + val.arrivalTime + '</li>' +
        //                '<li id="aTime' + index + '"><strong>UTC: </strong></li>' +
        //                '<li id="aWeather' + index + '"><strong>Weather: </strong></li>' +
        //                '<li id="aTemp' + index + '"><strong>Temperature: </strong></li>' +
        //                '<li id="aTerminal' + index + '"><strong>Terminal: </strong></li>' +
        //                '<li id="aGate' + index + '"><strong>Gate: </strong></li>' +
        //                '<li id="aBaggage' + index + '"><strong>Baggage: </strong></li>' +
        //                '<li id="aPrecheck' + index + '"><strong>Security Precheck: </strong></li>' +
        //            '</ul ></span >' +
        //        '</div>' +
        //    '</div>'
        //);
        getTsaCheckpoint(val.departureAirportFsCode, "d", index);
        displayWeatherInfo(departureAirport.latitude, departureAirport.longitude, "d", index);
        flightInfo.airportSC = val.departureAirportFsCode;
        getFlightStatus(flightInfo, "d", index);

        getTsaCheckpoint(val.arrivalAirportFsCode, "a", index);
        displayWeatherInfo(arrivalAirport.latitude, arrivalAirport.longitude, "a", index);
        flightInfo.airportSC = val.arrivalAirportFsCode;
        getFlightStatus(flightInfo, "a", index);
    });
}

//Info is a json object containing flight information.
//This function will dynamically display the information instead of trying to manually change it all.
var displayInfo = function (info, type, index) {
    //Check that there is actually info
    if (info.length > 2) {
        var airportObj = JSON.parse(info)[0].airport;

        //$('#' + type + 'Name' + index).append(airportObj.name)
        //$('#' + type + 'Loc' + index).append(airportObj.city)
        //$('#' + type + 'Time' + index).append(airportObj.utc)
        //$('#' + type + 'Precheck' + index).append(airportObj.utc)

      
    }
    else {
        //$('#' + type + 'Flight' + index).append('<strong>Not Available</strong>');
    }
}

var displayStatusInfo = function (info, type, index) {
    //Check that there is actually info 
    var airportResources = info == undefined ? undefined : info.airportResources;
    if (airportResources != undefined) {
        if (type == 'd') {
            $('#' + type + 'Gate' + index).append(airportResources.departureGate)
            $('#' + type + 'Gate' + index).append(info.operationalTimes.publishedDeparture.dateUtc)
        }
        if (type == 'a') {
            $('#' + type + 'Terminal' + index).append(airportResources.arrivalTerminal)
            $('#' + type + 'Gate' + index).append(airportResources.arrivalGate)
            $('#' + type + 'Baggage' + index).append(airportResources.baggage)
        }
    }
    else {
        $('#' + type + 'Gate' + index).append('N/A')
    }
}


//#endregion 

//PAGE EVENTS
$('body').on('click', '#searchBtn', function () {
    var input = $('#shortcodeInput').val();
    getTsaCheckpoint(input);
});

$('body').on('click', '#submitBtn', function () {
    $('#displayBox').html('');
    getFlightSchedule();
    $('#flightModal').modal('toggle');
});




/////////////////////////DMZ///////////////////////////////

//Deprecated for the construct layout function
//var displayFlightSchedule = function (info, userInput) {
//    var infoObj = JSON.parse(info);
//    var airport = infoObj.appendix.airports[0];
//    //displayWeatherInfo(airport.latitude, airport.longitude);
//    $.each(infoObj.scheduledFlights, function (index, val) {

//        $('#displayBox').append('<hr />');
//        $('#displayBox').append('<h4>Flight Number: ' + val.flightNumber + '</h4>');
//        $('#displayBox').append('<p><ul>');
//        $('#displayBox').append('<li><strong>Arrival Terminal</strong>: ' + val.arrivalTerminal + '</li>');
//        $('#displayBox').append('<li><strong>Departure Time</strong>: ' + val.departureTime + '</li>');
//        $('#displayBox').append('<li><strong>Arrival Time</strong>: ' + val.arrivalTime + '</li>');
//        $('#displayBox').append('</ul></p>');

//        $('#displayBox').append('<h5>Departure Airport</h5>');
//        $('#displayBox').append('<span id="dFlight' + index + '"></span>');
//        getTsaCheckpoint(val.departureAirportFsCode, "d", index);
//        displayWeatherInfo(airport.latitude, airport.longitude, "d", index);

//        userInput.airportSC = val.departureAirportFsCode;
//        getFlightStatus(userInput, "d", index);


//        $('#displayBox').append('<h5>Arrival Airport</h5>');
//        $('#displayBox').append('<span id="aFlight' + index + '"></span>');
//        getTsaCheckpoint(val.arrivalAirportFsCode, "a", index);
//    })
//}