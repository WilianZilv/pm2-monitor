const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const pm2 = require("./lib/pm2");

app.use(express.static(__dirname + "/client/build"));

const users = {};

function sendDataToUsers(event, data) {
	for (const user of Object.values(users)) {
		user.emit(event, data);
	}
}

pm2.events.on("processes", (data) => sendDataToUsers("processes", data));
pm2.events.on("log", (data) => {

	data.data = data.data.trim()
	if(!data.data.length) return
	data.data = data.data + '\n'

	const processes = pm2.list();
	const process = processes[data.pid];

	if (!process) {
		return;
	}
	data = { ...data };
	data.pname = process.name;
	data.time = new Date().toLocaleTimeString();
	data.timestamp = Date.now();

	sendDataToUsers("log", data);
});

io.on("connection", (socket) => {
	socket.emit("processes", pm2.list());

	users[socket.id] = socket;

	socket.once("disconnect", (reason) => {
		console.log("Disconnected:", reason);
		delete users[socket.id];
	});

	socket.on('stop', pm_id => {
		pm2.pm2.stop(pm_id)
	})
	socket.on('restart', pm_id => {
		pm2.pm2.restart(pm_id)
	})
});

server.listen(80, () => {
	console.log("listening on *:80");
});
