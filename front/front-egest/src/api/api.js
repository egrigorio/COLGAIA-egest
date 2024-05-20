import axios from "axios";
/* import config from "../config.json" */
/* tem a backurl e o "backLocalNetwork": "http://192.168.1.76:8080/" */
const api = axios.create({
	baseURL: 'http://localhost:9081/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default api;
