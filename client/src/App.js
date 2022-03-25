import { useState, useEffect, useMemo } from "react";
import ProcessesTable from "./components/ProcessesTable";
import ProcessLogs from "./components/ProcessLogs";
import Terminal from "./components/Terminal";

import socketio from "./services/socketio";

import "./App.css";

function App() {
	const [processes, setProcesses] = useState([]);
	const [ologs, setoLogs] = useState({});
	const [ids, setids] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		socketio.on("processes", setProcesses);
		socketio.on("logs", setoLogs);
	}, []);

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

	useEffect(() => {
		let logs = Object.values(ologs);

		if (!logs.length) return setData([]);

		logs = logs.reduce((prev, current) => [...prev, ...current]);

		if (ids.length) {
			logs = logs.filter((x) => ids.includes(x.pid));
		}

		let logs_count = {};
		let new_logs = [];

		for (const log of logs.slice().reverse()) {
			const key = log.pname + log.channel;
			if (!logs_count[key]) {
				logs_count[key] = 1;
			}

			if (logs_count[key] > 150) continue;

			new_logs.push(log);

			logs_count[key] += 1;
		}
		logs = new_logs.sort((a, b) => a.timestamp - b.timestamp);

		setData(logs);
	}, [ologs, ids]);

	return (
		<>
			<ProcessesTable data={processes} ids={ids} onFilter={onFilter} />
			<ProcessLogs data={data} ids={ids} />
		</>
	);
}

export default App;
