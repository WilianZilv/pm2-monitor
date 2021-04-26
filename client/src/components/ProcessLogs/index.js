import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import "./index.css";

function ListItem({ data, isLast, autoScroll }) {
	const ref = useRef();

	useEffect(() => {
		if (!isLast) return;
		if (!autoScroll) return;
		ref.current.scrollIntoView({ behaviour: "smooth" });
	}, [ref, data, isLast, autoScroll]);

	return (
		<>
			<div ref={ref} className={"process-logs-item " + data.channel}>
				<div className={"process-logs-top-bar"}>
					<strong className={"process-logs-item-title"}>
						{data.pname}:{" "}
					</strong>

					<strong>{data.time}</strong>
				</div>
				<code>{data.data}</code>
			</div>
		</>
	);
}

export default function ProcessLogs({ data }) {
	const [autoScroll, setAutoScroll] = useState(true);

	const { out, err } = useMemo(() => {
		const out = data.filter((x) => x.channel === "out").slice(0, 150);
		const err = data.filter((x) => x.channel === "err").slice(0, 150);
		return { out, err };
	}, [data]);

	return (
		<div className="process-logs-container">
			<h1>Logs</h1>
			<div className="process-logs-lists-container">
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
				<div className="process-logs-list">
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
			</div>
		</div>
	);
}
