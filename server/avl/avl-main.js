const net = require('net');
const port = 3001;
const host = '0.0.0.0';

const INIT_MOBILEID = "ID="
const END_MOBILEID = "<"

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            //sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
            data = data.toString()
            const mobileID = data.substring(data.indexOf(INIT_MOBILEID)+3, data.indexOf(END_MOBILEID))
            console.log("mobileID:",mobileID);
            
            //sock.write(data)
        });
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});