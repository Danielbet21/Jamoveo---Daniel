'''
This module contains the SocketIO routes for handling WebSocket events.
'''
def register_socketio_events(socketio):
   
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')


    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')
