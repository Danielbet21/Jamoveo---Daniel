import eventlet
eventlet.monkey_patch()  # Enables async I/O for SocketIO

import os
import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from flask_mongoengine import MongoEngine
from app.routes.auth_routes import signup_bp
from app.routes.socketio_routes import register_socketio_events

load_dotenv()

db = MongoEngine()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__)
    
    # Configure logging
    logging.basicConfig(level=logging.DEBUG)  # Or logging.INFO
    handler = logging.StreamHandler()
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.DEBUG)

    # --- App Configuration ---
    app.config.from_object('app.config.Config')

    # --- Initialize Extensions ---
    db.init_app(app)
    socketio.init_app(app)
    CORS(app)

    # --- Register Blueprints ---
    app.register_blueprint(signup_bp, url_prefix="/api")
    register_socketio_events(socketio)

    return app
