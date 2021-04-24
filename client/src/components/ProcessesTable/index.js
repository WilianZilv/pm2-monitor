import React, { useMemo } from "react";
import Table from "../Table";
import CJSON from "circular-json";
import "./index.css";

const makeColumns = ({ ids, onFilter }) => [
	{ Header: "ID", accessor: "pm_id" },
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
			<h1>Processos</h1>
			<Table columns={columns} data={data}></Table>
		</div>
	);
}
