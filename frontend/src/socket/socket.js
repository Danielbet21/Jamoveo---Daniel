import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
export default socket;

//This file is responsible for creating a socket connection to the server from the frontend.