import React, { useMemo } from "react";
import Table from "../Table";
import CJSON from "circular-json";
import "./index.css";
import socketio from "../../services/socketio";

const makeColumns = ({ ids, onFilter }) => [
	{ Header: "ID", accessor: "pm_id" },

	{
		Header: "RAM",
		accessor: "monit.memory",
		Cell: ({ value }) => (value / 1e6).toFixed(1) + "MB",
		style: {
			minWidth: 70,
		},
	},
	{
		Header: "CPU",
		accessor: "monit.cpu",
		Cell: ({ value }) => String(value.toFixed(0)) + "%",
		style: {
			minWidth: 48,
		},
	},

	{
		Header: "",
		accessor: "stop",
		Cell: ({ row }) => (
			<button
				className="process-table-button"
				onClick={() => socketio.emit("stop", row.values.pm_id)}
			>
				Parar
			</button>
		),
	},
	{
		Header: "",
		accessor: "restart",
		Cell: ({ row }) => (
			<button
				className="process-table-button"
				onClick={() => socketio.emit("restart", row.values.pm_id)}
			>
				Reiniciar
			</button>
		),
	},
	{
		Header: "STATUS",
		accessor: "pm2_env.status",
		Cell: ({ value }) => (
			<div className={"status-col"}>
				<span className={`dot dot-${value}`}></span>
			</div>
		),
	},
	{
		Header: "NAME",
		accessor: "name",
	},
	{
		Header: "LOGS",
		Cell: ({ row }) => (
			<input
				className="checkbox"
				type="checkbox"
				checked={ids.includes(row.values.pm_id)}
				onChange={() => onFilter(row.values.pm_id)}
			/>
		),
	},
];

export default function ProcessesTable({ data, ids, onFilter }) {
	const columns = useMemo(() => makeColumns({ ids, onFilter }), [ids]);
	return (
		<div className="processes-table-container">
			<h3>Processos</h3>
			<Table columns={columns} data={data}></Table>
		</div>
	);
}
