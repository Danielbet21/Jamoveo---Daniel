import eventlet
eventlet.monkey_patch() # monkey_patch is used to enable async I/O

from flask import Flask
from flask_socketio import SocketIO

'''
This module initializes the Flask application and sets up the SocketIO server.
'''

socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    socketio.init_app(app)

    from app.routes.socketio_routes import register_socketio_events
    register_socketio_events(socketio)

    return app
