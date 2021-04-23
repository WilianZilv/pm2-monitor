import socketio from "./socketio";
import EventEmitter from "../utils/EventEmitter";

const events = new EventEmitter();

socketio.on("log", (data) => events.emit(data.pid, data));

export default events;
