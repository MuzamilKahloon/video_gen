import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
  }

  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('job:progress', (data) => {
      // data: { jobId, progress, stage, message }
      this.notifyListeners('job:progress', data);
    });

    this.socket.on('job:completed', (data) => {
      toast.success(`Video generation complete: ${data.title}`);
      this.notifyListeners('job:completed', data);
    });

    this.socket.on('job:failed', (data) => {
      toast.error(`Job failed: ${data.message}`);
      this.notifyListeners('job:failed', data);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  addListener(event, callback) {
    this.listeners.add({ event, callback });
  }

  removeListener(event, callback) {
    this.listeners.forEach(listener => {
      if (listener.event === event && listener.callback === callback) {
        this.listeners.delete(listener);
      }
    });
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      if (listener.event === event) {
        listener.callback(data);
      }
    });
  }
}

export const socketService = new SocketService();
