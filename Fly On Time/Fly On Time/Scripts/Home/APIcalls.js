
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