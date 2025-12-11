import { io } from 'socket.io-client';

// Update this URL when backend is ready
const SOCKET_URL = 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Connection events
socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

// Custom event listeners (These will be handled in components)
// socket.on('tokenGenerated', (data) => { ... });
// socket.on('nowServing', (data) => { ... });
// socket.on('queueUpdate', (data) => { ... });
// socket.on('counterUpdate', (data) => { ... });

export default socket;