import { io } from 'socket.io-client';

const socket = io('https://jamoveo-daniel-production.up.railway.app', {
  transports: ['polling', 'websocket'], // allow fallback
  withCredentials: false                
});


export default socket;
