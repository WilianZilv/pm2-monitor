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

	setInterval(() => {
		pm2.list((err, data) => {
			if (err) {
				console.error(err);
				process.exit(2);
			}
			processes = data;
			events.emit("processes", processes);
		});
	}, 0.5 * 1000);
});

function processLog(event, { data, process }) {
	if (!logs[process.pm_id]) {
		logs[process.pm_id] = {
			out: [],
			err: [],
		};
	}
	logs[process.pm_id][event].push(data);

	if (logs[process.pm_id][event].length >= 150) {
		logs[process.pm_id][event].shift();
	}

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
};
