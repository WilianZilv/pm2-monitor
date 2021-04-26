import { useState, useEffect, useMemo } from "react";
import ProcessesTable from "./components/ProcessesTable";
import ProcessLogs from "./components/ProcessLogs";
import socketio from "./services/socketio";

import "./App.css";

function handleLog(logs, log) {
	let merged = false;
	logs = logs.map((x) => {
		x = { ...x };
		if (x.pid === log.pid && x.channel === log.channel) {
			if (x.timestamp + 5000 >= log.timestamp) {
				if (x.data.split("\n").length <= 32) {
					log = { ...log };
					log.data = x.data + log.data;
					log.timestamp = x.timestamp;
					x = log;
					merged = true;
				}
			}
		}

		return x;
	});

	if (!merged) logs.unshift(log);

	const { out, err } = logs
		.filter((x) => x.pid === log.pid)
		.reduce(
			(data, item) => {
				data[item.channel].push(item);
				data[item.channel] = data[item.channel].slice(0, 150);
				return data;
			},
			{ out: [], err: [] }
		);

	logs = logs.filter((x) => x.pid !== log.pid);

	logs = [...out, ...err, ...logs].sort((a, b) => a.timestamp - b.timestamp);

	return logs;
}

function App() {
	const [processes, setProcesses] = useState([]);
	const [ologs, setoLogs] = useState([]);
	const [ids, setids] = useState([]);

	useEffect(() => {
		socketio.on("processes", setProcesses);
		socketio.on("log", (data) =>
			setoLogs((state) => handleLog(state, data))
		);
	}, []);

	const filteredLogs = useMemo(() => {
		if (!ids.length) return ologs;
		return ologs.filter((x) => ids.includes(x.pid));
	}, [ologs, ids]);

	function onFilter(id) {
		setids((ids) => {
			if (ids.includes(id)) {
				ids = ids.filter((x) => x !== id);
			} else {
				ids = [id, ...ids];
			}

			return ids;
		});
	}

	return (
		<>
			<main>
				<ProcessesTable
					data={processes}
					ids={ids}
					onFilter={onFilter}
				/>

				<ProcessLogs data={filteredLogs} ids={ids} />
			</main>
			<footer></footer>
		</>
	);
}

export default App;
