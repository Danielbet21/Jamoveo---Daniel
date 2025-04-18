import { io } from 'socket.io-client';

const socket = io('http://104.155.152.39:5000');
export default socket;

//This file is responsible for creating a socket connection to the server from the frontend.