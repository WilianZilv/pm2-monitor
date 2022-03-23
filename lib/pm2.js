const pm2 = require("pm2");
const { EventEmitter } = require("events");

const events = new EventEmitter();

let processes = [];
let logs = {};

pm2.connect((err) => {
	if (err) {
		console.error(err);
		process.exit(2);
	}

	function list() {
		pm2.list((err, data) => {
			if (err) {
				console.error(err);
				process.exit(2);
			}
			processes = data;
			events.emit("processes", processes);
			list();
		});
	}
	list();
});

function processLog(event, { data, process }) {
	events.emit("log", { pid: process.pm_id, channel: event, data });
}

pm2.launchBus(function (err, bus) {
	if (err) {
		console.error(err);
		process.exit(2);
	}
	bus.on("log:out", (data) => processLog("out", data));
	bus.on("log:err", (data) => processLog("err", data));
});

module.exports = {
	list: () => processes,
	getLogs: () => logs,
	events,
	pm2,
};
