const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const pm2 = require("./lib/pm2");
const { spawn } = require("cross-spawn");
const os = require("os");

let cmd = undefined;

function startTerminal() {
	if (cmd) {
		cmd.stdout.removeAllListeners();
		cmd.stderr.removeAllListeners();
		cmd.kill();
	}

	let command = "cmd";

	switch (os.platform()) {
		case "win32":
			command = "cmd";
			break;
		default:
			command = "bash";
			break;
	}

	cmd = spawn(command, { shell: true });

	if (os.platform() === "win32") {
		cmd.stdin.write("cmd /c chcp 65001>nul\n");
	}

	cmd.stdout.on("data", (data) => {
		sendDataToUsers("terminalData", String(data).split("\n"));
	});
	cmd.stderr.on("data", (data) => {
		sendDataToUsers("terminalData", String(data).split("\n"));
	});
}

app.use(express.static(__dirname + "/client/build"));

const users = {};

function sendDataToUsers(event, data) {
	for (const user of Object.values(users)) {
		user.emit(event, data);
	}
}

pm2.events.on("processes", (data) => sendDataToUsers("processes", data));
pm2.events.on("logs", (data) => {
	sendDataToUsers("logs", data);
});

io.on("connection", (socket) => {
	socket.emit("processes", pm2.list());

	socket.emit("logs", pm2.getLogs());

	users[socket.id] = socket;

	socket.once("disconnect", (reason) => {
		console.log("Disconnected:", reason);
		delete users[socket.id];
	});

	socket.on("stop", (pm_id) => {
		pm2.pm2.stop(pm_id);
	});
	socket.on("restart", (pm_id) => {
		pm2.pm2.restart(pm_id);
	});

	socket.on("cmd", (command) => {
		if (command === "SIGTERM") {
			startTerminal();
			return;
		}

		cmd.stdin.write(command + "\n");
	});
});

server.listen(80, () => {
	console.log("listening on *:80");
});
