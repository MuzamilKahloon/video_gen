// client/src/hooks/useSocket.js
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {SOCKET_URL} from "@utils/constants";
import {useAuthStore} from "@store/authStore";
import {useProjectStore} from "@store/projectStore";

export const useSocket = () => {
	const socketRef = useRef(null);
	const [connected, setConnected] = useState(false);
	const {token} = useAuthStore();
	const {updateProject, updateProjectStatus, updateProjectProgress} =
		useProjectStore();

	useEffect(() => {
		if (!token) return;

		// Initialize socket connection
		socketRef.current = io(SOCKET_URL, {
			auth: {token},
			transports: ["websocket"],
		});

		// Connection events
		socketRef.current.on("connect", () => {
			setConnected(true);
			console.log("Socket connected");
		});

		socketRef.current.on("disconnect", () => {
			setConnected(false);
			console.log("Socket disconnected");
		});

		// Project events
		socketRef.current.on("project:status", (data) => {
			updateProjectStatus(data.projectId, data.status);
		});

		socketRef.current.on("project:progress", (data) => {
			updateProjectProgress(data.projectId, data.progress);
		});

		socketRef.current.on("project:completed", (data) => {
			updateProject(data.projectId, {
				status: "completed",
				videoUrl: data.videoUrl,
				progress: 100,
			});
		});

		socketRef.current.on("project:failed", (data) => {
			updateProject(data.projectId, {
				status: "failed",
				error: data.error,
			});
		});

		// Cleanup on unmount
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, [token]);

	const emit = (event, data) => {
		if (socketRef.current) {
			socketRef.current.emit(event, data);
		}
	};

	const on = (event, callback) => {
		if (socketRef.current) {
			socketRef.current.on(event, callback);
		}
	};

	const off = (event, callback) => {
		if (socketRef.current) {
			socketRef.current.off(event, callback);
		}
	};

	return {
		socket: socketRef.current,
		connected,
		emit,
		on,
		off,
	};
};
