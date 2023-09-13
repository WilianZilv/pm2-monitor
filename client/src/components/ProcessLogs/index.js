import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import "./index.css";
import Table from "../Table";

function ListItem({ data, isLast, autoScroll }) {
	const ref = useRef();

	useEffect(() => {
		if (!isLast) return;
		if (!autoScroll) return;
		ref.current.scrollIntoView({ behaviour: "smooth" });
	}, [ref, data, isLast, autoScroll]);

	const value = useMemo(() => {
		try {
			let json = data.data.trim();
			if (json.startsWith("{'") || json.startsWith("[{'")) {
				json = json.replaceAll("'", '"');
			}

			json = json.replace(/\bNone\b/g, "null");
			json = json.replace(/\bNaN\b/g, "null");

			json = JSON.parse(json);

			let columns = json.reduce(
				(prev, cur) => [...prev, ...Object.keys(cur)],
				[]
			);
			columns = Array.from(new Set(columns));
			columns = columns.map((x) => ({
				Header: x,
				accessor: x,
			}));

			return (
				<>
					<Table columns={columns} data={json} />
					<br />
				</>
			);
		} catch (error) {}

		return <code className={`log-${data.channel}`}>{data.data}</code>;
	}, [data]);

	return (
		<>
			<div ref={ref} className={"process-logs-item"}>
				{!data.hideInfo && (
					<>
						<center
							className={`process-logs-item-divider process-logs-item-divider-${data.channel}`}
						>
							<code
								className={
									"process-logs-item-info " + data.channel
								}
							>
								[{data.pname}]
							</code>
							<code
								className={
									"process-logs-item-info " + data.channel
								}
							>
								[{data.time}]
							</code>
						</center>
					</>
				)}
				{value}

				{data.showInfoBelow && (
					<center className="process-logs-item-divider">
						<code
							className={"process-logs-item-info " + data.channel}
						>
							[{data.pname}]
						</code>

						<code
							className={"process-logs-item-info " + data.channel}
						>
							[{data.time}]
						</code>
					</center>
				)}
			</div>
		</>
	);
}

function setHideInfo(data) {
	data = data.reverse();

	for (let i = 0; i < data.length - 1; i++) {
		if (i > data.length - 1) break;

		const next = data[i + 1];
		const item = { ...data[i] };

		if (item.pname == next.pname && item.channel === next.channel) {
			item.hideInfo = true;
		}

		if (i === 0) {
			item["showInfoBelow"] = true;
		}

		data[i] = item;
	}

	return data.reverse();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const vertical = !!urlParams.get("vertical");


export default function ProcessLogs({ data, ids }) {
	const [autoScroll, setAutoScroll] = useState(true);
	const [pause, setPause] = useState(false);

	const [out, setOut] = useState([]);
	const [err, setErr] = useState([]);

	useEffect(() => {
		if (pause) return;

		let out = data.filter((x) => x.channel === "out");
		let err = data.filter((x) => x.channel === "err");
		if (ids.length != 1) {
			out = out.slice(-20)
			err = err.slice(-20)
		}

		out = setHideInfo(out);
		err = setHideInfo(err);

		setOut(out);
		setErr(err);
	}, [data, pause, ids]);

	const verticalClass = vertical ? " process-logs-list-container-vertical" : ""
	return (
		<div className="process-logs-container">
			<h3>Logs</h3>

			<div className={"process-logs-lists-container" + verticalClass}>
				<div className="process-logs-list">
					{out.map((x, i) => (
						<ListItem
							isLast={i === out.length - 1}
							autoScroll={autoScroll}
							key={i}
							data={x}
						/>
					))}
				</div>

				<div className="process-logs-list err">
					{err.map((x, i) => (
						<ListItem
							isLast={i === err.length - 1}
							autoScroll={autoScroll}
							key={i}
							data={x}
						/>
					))}
				</div>
			</div>

			<div className="process-logs-footer">
				<label>
					<input
						id="autoScroll"
						type="checkbox"
						checked={autoScroll}
						onChange={() => setAutoScroll((x) => !x)}
					/>
					{"	"}Scroll Automático
				</label>
				<label>
					<input
						id="autoScroll"
						type="checkbox"
						checked={pause}
						onChange={() => setPause((x) => !x)}
					/>
					{"	"}Pausar
				</label>
			</div>
		</div>
	);
}
