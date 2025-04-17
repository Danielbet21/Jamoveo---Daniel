import { io } from 'socket.io-client';

const socket = io('https://jamoveo-daniel-production.up.railway.app', {
  transports: ['websocket'],   // Force using WebSocket only
  withCredentials: false       // Adjust based on your auth (true if using cookies)
});

export default socket;
