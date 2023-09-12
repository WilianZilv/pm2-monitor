import React, { useMemo } from "react";
import Table from "../Table";
import CJSON from "circular-json";
import "./index.css";
import socketio from "../../services/socketio";

const PauseIcon = () => <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVUlEQVR4nO3RuQmAQBRFUUtRC3Jpz60Ay9MCjoEzMJkDgqB4wxO84P+i+F7oMaJKrMaELmdgdzYntgTbcgZia2JrxH/AMzfY7r6xxYAysSpYcznwvg5y9OGV904WaQAAAABJRU5ErkJggg=="></img>
const RestartIcon = () => <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABDElEQVR4nJ2TTU4CQRCFaQIXgIU7RsDtxFu4hAN4BQIsTZCLcAAvwQYSj6AHUHdudKcrP/PgTZy0PcNPJZ3MdFd9XfWqutGoMeAKGAHXQKhyagIPwLq0Lnx2D3yxtzdgBrRTkDtgBfzYOYvO+8AC+AC2QDcGtIFH4D0FKPllwJMhf5kAc+ATuDGgV6NL5kymxUYAXlxvC7iVLgfEle/rTlj2CssGdUERYOiYXD9jKx1OAATHjAvA95mAUbmE/rklBA/J4gTA0sKHYmPm1mRHBF+65ZN4kLYekkqIg5+Bzb+R1ngaokzU52FUs9LWzQruVN2gTKYeEpmUVodkqnmSfEwJkITN/ZS19J1s8y+IDKVEPtYZ1AAAAABJRU5ErkJggg=="></img>

const makeColumns = ({ ids, onFilter, showDetails }) => [

	...(showDetails ? [

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
] : []),

	{
		Header: "",
		accessor: "stop",
		Cell: ({ row }) => (
			<button
				className="process-table-button"
				onClick={() => socketio.emit("stop", row.values.pm_id)}
			>
				<PauseIcon/>
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
				<RestartIcon/>
			</button>
		),
	},


	{ Header: "", accessor: "pm_id" },

	{
		Header: "NAME",
		accessor: "name",
	},
	{
		Header: "",
		accessor: "pm2_env.status",
		Cell: ({ value }) => (
			<div className={"status-col"}>
				<span  className={`dot dot-${value}`}></span>
			</div>
		),
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

	const [showDetails, setShowDetails] = React.useState(false);



	const columns = useMemo(() => makeColumns({ ids, onFilter, showDetails }), [ids, showDetails]);
	//console.log(data)
	return (
		<div className="processes-table-container">
			<h3>Processos</h3>
				<button className="process-table-button" onClick={() => setShowDetails(prev => !prev)}>
					{showDetails ? "Ocultar detalhes" : "Mostrar detalhes"}
				</button>
			<Table columns={columns} data={data.sort((a, b) => a.name.localeCompare(b.name))}></Table>
		</div>
	);
}
