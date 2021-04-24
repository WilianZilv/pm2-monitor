import { useState, useEffect, useMemo } from "react";
import "./index.css";

function ListItem({ data }) {
	return (
		<>
			<div className={"process-logs-item " + data.channel}>
				<div className={"process-logs-top-bar"}>
					<strong className={"process-logs-item-title"}>
						{data.pname}:{" "}
					</strong>

					<strong>{data.time}</strong>
				</div>
				{data.data}
			</div>
		</>
	);
}
export default function ProcessLogs({ data }) {
	const logs = useMemo(() => {
		let logs = [...data];
		logs.slice(0, 100);

		return logs;
	}, [data]);

	useEffect(() => {
		document
			.getElementsByClassName("process-logs-list")[0]
			.scrollIntoView();
	}, [logs]);
	return (
		<div className="process-logs-container">
			<h1>Logs</h1>
			<div className="process-logs-lists-container">
				<div className="process-logs-list">
					{logs
						.filter((x) => x.channel === "out")
						.map((x, i) => (
							<ListItem key={i} data={x} />
						))}
				</div>
				<div className="process-logs-list">
					{logs
						.filter((x) => x.channel === "err")
						.map((x, i) => (
							<ListItem key={i} data={x} />
						))}
				</div>
			</div>
		</div>
	);
}
