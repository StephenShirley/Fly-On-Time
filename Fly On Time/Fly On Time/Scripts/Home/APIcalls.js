
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
////Info is a json object containing flight information.
    ////This function will dynamically display the information instead of trying to manually change it all.
    //var displayInfo = function (info, type, index) {
    //    //Check that there is actually info
    //    if (info.length > 2) {
    //        var airportObj = JSON.parse(info)[0].airport;

    //        //$('#' + type + 'Name' + index).append(airportObj.name)
    //        //$('#' + type + 'Loc' + index).append(airportObj.city)
    //        //$('#' + type + 'Time' + index).append(airportObj.utc)
    //        //$('#' + type + 'Precheck' + index).append(airportObj.utc)


    //    }
    //    else {
    //        //$('#' + type + 'Flight' + index).append('<strong>Not Available</strong>');
    //    }
    //}*@
//var getTsaCheckpoint = function (shortcodeInput, type, index) {
    //    $.get("/Home/getTsaCheckpoint", { shortcode: shortcodeInput }, function (data, textStatus, XQHR) {
    //        displayInfo(data, type, index);

    //    }).error(function (data, text) {
    //        console.log(data);
    //    });
    //}
    //#endregion*@
    //#region API CALLS
        //var displayWeatherInfo = function (latitude, longitude, type, index) {
        //    var coordinates = { latitude: latitude, longitude: longitude };
        //    $.get("/Home/getWeatherByCoordinates", coordinates, function (data, textStatus, XQHR) {
        //        var weatherObj = JSON.parse(data);
        //        var weatherCondObj = weatherObj.weather[0];
        //        var temperatureObj = weatherObj.main;

        //        $('#' + type + 'Weather' + index).append(weatherCondObj.main);
        //        $('#' + type + 'Temp' + index).append(temperatureObj.temp);


        //    }).error(function (data, text) {
        //        console.log(data);
        //    });

        //}
