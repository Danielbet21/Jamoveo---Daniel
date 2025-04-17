import { io } from 'socket.io-client';

const socket = io('https://jamoveo-daniel-production.up.railway.app');

export default socket;

//This file is responsible for creating a socket connection to the server from the frontend.