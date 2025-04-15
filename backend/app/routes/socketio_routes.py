from flask_socketio import SocketIO, emit
from flask import request
'''
This module contains the SocketIO routes for handling all the real-time events.
'''
# socketio_routes.py

def register_socketio_events(socketio: SocketIO):
    @socketio.on('connect')
    def handle_connect():
        print(f'Client connected: {request.sid}')

    @socketio.on('disconnect')
    def handle_disconnect():
        print(f'Client disconnected: {request.sid}')

    @socketio.on('select_song')
    def handle_song_selected(song_data):
        print(f"Admin selected song: {song_data}")
        # Broadcast to everyone except sender
        emit('song_selected', song_data, broadcast=True, include_self=False)

