from flask_socketio import SocketIO, emit
from flask import request
import logging

logging.basicConfig(level=logging.INFO)
'''
This module contains the SocketIO routes for handling all real-time events:
    - Connection / Disconnection
    - Admin selecting a song
    - Admin quitting the session

'''

def register_socketio_events(socketio: SocketIO):
    @socketio.on('connect')
    def handle_connect():
        '''
        Triggered when a client connects to the server.
        '''
        logging.info(f'[Socket] Client connected: {request.sid}')

    @socketio.on('disconnect')
    def handle_disconnect():
        ''' 
        Triggered when a client disconnects.
        '''
        logging.info(f'[Socket] Client disconnected: {request.sid}')

    @socketio.on('select_song')
    def handle_song_selected(song_data):
        '''
        Triggered by the admin when a song is selected then 
        broadcasts the song to all connected players.
        '''
        emit('song_selected', song_data, broadcast=True, include_self=False)

    @socketio.on('quit_session')
    def handle_quit_session():
        '''
        Triggered by the admin when they quit the session then
        broadcasts a signal to all players to return to the main page.
        '''
        logging.info(f'[Socket] Admin quit the session')
        emit('quit_session', broadcast=True)
