//Reference: https://www.npmjs.com/package/mqtt

var mqtt = require('mqtt');
var options = { qos: 1, keepalive: 100, reconnectPeriod: 50000 };
var access = require('../../global_values')
ip = access.ip_address;
port = access.tcp_port;
options = access.options;
var client = mqtt.connect('tcp://' + ip + ':' + port, options);

var publisher = {

    start: function() {

        //Called when client is connected
        client.on('connect', function() {
            console.log('Status: Publisher is connected to broker')
        });

        //Called when client is disconnected
        client.on('disconnect', function() {
            console.log('Status: Publisher has been disconnected')
            client.reconnect();
        })

        //Called when client is reconnecting
        client.on('reconnect', function() {
            console.log('Status: Publisher is reconnecting')
        })

        //Called when client is offline
        client.on('offline', function() {
            console.log('Status: Publisher is offline')
            client.reconnect();
        })

    },

    publish: function publishing(message) {
        var topic = access.sendToExtractData;
        client.publish(topic, message);

    }
}

module.exports = publisher