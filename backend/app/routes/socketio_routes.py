from flask_socketio import SocketIO, emit
from flask import request

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
        This event is triggered when a client connects to the server.
        '''
        print(f'[Socket] Client connected: {request.sid}')

    @socketio.on('disconnect')
    def handle_disconnect():
        ''' 
        This event is triggered when a client disconnects.
        '''
        print(f'[Socket] Client disconnected: {request.sid}')

    @socketio.on('select_song')
    def handle_song_selected(song_data):
        '''
        This event is triggered by the admin when a song is selected.
        Broadcasts the song to all connected players.
        '''
        emit('song_selected', song_data, broadcast=True, include_self=False)

    @socketio.on('quit_session')
    def handle_quit_session():
        '''
        This event is triggered by the admin when they quit the session.
        Broadcasts a signal to all players to return to the main page.
        '''
        print(f'[Socket] Admin quit the session')
        emit('quit_session', broadcast=True)
