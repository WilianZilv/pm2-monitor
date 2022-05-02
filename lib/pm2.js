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
			setTimeout(() => {
				list();
			}, 250);
		});
	}
	list();
});

function processLog(event, { data, process }) {
	data = data.trim();
	if (!data.length) return;
	data = data + "\n";

	const log = {
		pid: process.pm_id,
		pname: process.name,
		channel: event,
		data,
		time: new Date().toLocaleTimeString(),
		timestamp: Date.now(),
	};

	const key = log.pname + log.channel;
	if (!logs[key]) logs[key] = [];

	logs[key] = [...logs[key], log].reverse().slice(0, 150).reverse();

	events.emit("logs", logs);
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
