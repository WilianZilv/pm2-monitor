import { useState, useEffect, useMemo } from "react";
import ProcessesTable from "./components/ProcessesTable";
import ProcessLogs from "./components/ProcessLogs";
import socketio from "./services/socketio";

import "./App.css";

function handleLog(logs, log) {
	logs = [log, ...logs];
	const { out, err } = logs
		.filter((x) => x.pid === log.pid)
		.reduce(
			(data, item) => {
				data[item.channel].push(item);
				data[item.channel] = data[item.channel].slice(0, 50);
				return data;
			},
			{ out: [], err: [] }
		);

	logs = logs.filter((x) => x.pid !== log.pid);

	logs = [...out, ...err, ...logs].sort((a, b) => b.timestamp - a.timestamp);

	return logs;
}

function App() {
	const [processes, setProcesses] = useState([]);
	const [logs, setLogs] = useState([]);
	const [pids, setPids] = useState([]);

	useEffect(() => {
		socketio.on("processes", setProcesses);
		socketio.on("log", (data) =>
			setLogs((state) => handleLog(state, data))
		);
	}, []);

	const filteredLogs = useMemo(() => {
		if (!pids.length) return logs;

		return logs.filter((x) => pids.includes(x.pid));
	}, [logs, pids]);

	function onFilter(pid) {
		setPids((pids) => {
			if (pids.includes(pid)) {
				pids = pids.filter((x) => x !== pid);
			} else {
				pids = [pid, ...pids];
			}

			return pids;
		});
	}

	return (
		<main>
			<ProcessesTable data={processes} pids={pids} onFilter={onFilter} />

			<ProcessLogs data={filteredLogs} pids={pids} />
		</main>
	);
}

export default App;
