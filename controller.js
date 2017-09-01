'use strict';

var net = require('net');

// Set your IP here
var PJ_IP = '10.11.12.50';
var PJ_PORT = '4098';

/* Matrix Controller */

module.exports.onButtonPressed = function onButtonPressed(name) {
    console.log(`[EPSON CONTROLLER] ${name} button pressed`);

    var stringToSend = "";
    var client = new net.Socket();
    client.connect(PJ_PORT, PJ_IP, function () {
        console.log('Connected');

        if (name == "on" || name == "off") {
            stringToSend = "PWR " + name.toUpperCase();
        } else if (name.substring(0, 5) == "CMODE") {
            stringToSend = name;
        }

        if (stringToSend != '') {
            console.log('Sent Message %s', stringToSend);

            client.write(stringToSend + "\r\n");
        }
        client.destroy();
    });


};


