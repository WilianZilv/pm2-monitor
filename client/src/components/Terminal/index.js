import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import socketio from "../../services/socketio";

export default function Terminal() {
	const [history, setHistory] = useState([]);
	const [inputHistory, setInputHistory] = useState([]);

	const bodyRef = useRef();
	const inputRef = useRef();

	function addToHistory(text) {
		setHistory((state) => {
			if (text.length) {
				if (["clear", "cls"].includes(text[0])) return [];
			}

			return [...state, ...text];
		});
	}

	function handleKeyDown(e) {
		switch (e.keyCode) {
			case 13: //ENTER
				const cmd = inputRef.current.value;
				inputRef.current.value = "";
				socketio.emit("cmd", cmd);
				setInputHistory((state) => [...state, cmd]);
				break;
			case 67:
				if (e.ctrlKey) {
					if (inputRef.current.value) {
						inputRef.current.value = "";
						break;
					}
					socketio.emit("cmd", "SIGTERM");
				}
				break;
			default:
				return;
		}
	}

	useEffect(() => {
		socketio.on("terminalData", (x) => {
			addToHistory(x);
		});
	}, []);

	useEffect(() => {
		bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
	}, [history]);

	return (
		<div className="terminal-container">
			<h3>Terminal</h3>
			<div className="terminal-body" ref={bodyRef}>
				{history.map((x, i) => (
					<p key={i}>
						<span>{x}</span>
					</p>
				))}
			</div>
			<input
				className="terminal-input"
				onKeyDown={handleKeyDown}
				ref={inputRef}
			/>
		</div>
	);
}
