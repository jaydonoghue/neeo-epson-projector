'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

console.log('Epson TCP Projector');
console.log('---------------------------------------------');

/*
 * Adapter - an Adapter to connect inputs + outputs from HDBaseT matrix
 */

// first we set the device info, used to identify it on the Brain
const pj = neeoapi.buildDevice('Epson TCP Projector')
    .setManufacturer('Epson')
    .addAdditionalSearchToken('Projector')
    .addAdditionalSearchToken('8350UB')
    .setType("ACCESSOIRE")
    //.setType('Matrix')

    // Capabilities of the device
    .addButton({ name: 'on', label: 'Power On' })
    .addButton({ name: 'off', label: 'Power Off' })
    
    .addButtonHander(controller.onButtonPressed);

function startSdkExample(brain) {
    console.log('- Start server');
    neeoapi.startServer({
        brain,
        port: 6337,
        name: 'epson-projector',
        devices: [pj]
    })
        .then(() => {
            console.log('# READY! use the NEEO app to search for "Epson TCP".');
        })
        .catch((error) => {
            //if there was any error, print message out to console
            console.error('ERROR!', error.message);
            process.exit(1);
        });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
    console.log('- use NEEO Brain IP from env variable', brainIp);
    startSdkExample(brainIp);
} else {
    console.log('- discover one NEEO Brain...');
    neeoapi.discoverOneBrain()
        .then((brain) => {
            console.log('- Brain discovered:', brain.name);
            startSdkExample(brain);
        });
}
