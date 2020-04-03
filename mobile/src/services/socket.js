const socketio = require('socket.io-client');

const socket = socketio('http://192.168.1.102:2999', {
	autoConnect: false
});

function subscribeToNewDev(subscribeFunction) {
	socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
	socket.io.opts.query = {
		latitude,
		longitude,
		techs
	};

	socket.connect();
}

function disconnect() {
	if (socket.connect) {
		socket.disconnect();
	}
}

export { connect, disconnect, subscribeToNewDev };
