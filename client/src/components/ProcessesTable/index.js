import React, { useMemo } from "react";
import Table from "../Table";
import CJSON from "circular-json";
import "./index.css";

const makeColumns = ({ pids, onFilter }) => [
	{ Header: "PID", accessor: "pid" },
	{
		Header: "Nome",
		accessor: "name",
	},
	{
		Header: "RAM",
		accessor: "monit.memory",
		Cell: ({ value }) => (value / 1e6).toFixed(1) + "MB",
	},
	{
		Header: "CPU",
		accessor: "monit.cpu",
		Cell: ({ value }) => String(value) + " %",
	},
	{
		Header: "Status",
		accessor: "pm2_env.status",
		Cell: ({ value }) => (
			<div className={"status-col"}>
				<span
					className={`dot ${value === "online" ? value : ""}`}
				></span>
			</div>
		),
	},
	{
		Header: "Logs",
		Cell: ({ row }) => (
			<input
				type="checkbox"
				checked={pids.includes(row.values.pid)}
				onChange={() => onFilter(row.values.pid)}
			/>
		),
	},
];

export default function ProcessesTable({ data, pids, onFilter }) {
	const columns = useMemo(() => makeColumns({ pids, onFilter }), [pids]);
	return (
		<div className="processes-table-container">
			<h1>Processos</h1>
			<Table columns={columns} data={data}></Table>
		</div>
	);
}
