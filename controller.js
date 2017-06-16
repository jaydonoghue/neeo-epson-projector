'use strict';

var net = require('net');

// Set your IP here
var PJ_IP = '10.11.12.50';
var PJ_PORT = '4098'

/* Matrix Controller */

module.exports.onButtonPressed = function onButtonPressed(name) {
    console.log(`[EPSON CONTROLLER] ${name} button pressed`);


    var client = new net.Socket();
    client.connect(PJ_PORT, PJ_IP, function () {
        console.log('Connected');

        if (name == "on" || name == "off") {
            var stringToSend = "PWR " + name.toUpperCase() + "\r\n";

            console.log('Sent Message %s', stringToSend);

            client.write(stringToSend);
        }

        client.destroy();
    });


};


