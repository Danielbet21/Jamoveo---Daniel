import eventlet
eventlet.monkey_patch()  # Enables async I/O for SocketIO

import os
import logging
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from flask_mongoengine import MongoEngine

from app.routes.auth_routes import signup_bp, login_bp, result_bp, live_bp, signup_admin_bp
from app.routes.socketio_routes import register_socketio_events

# --- Load environment variables ---
load_dotenv()

# --- Initialize Extensions ---
db = MongoEngine()
socketio = SocketIO(cors_allowed_origins="*")

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="")

    # --- Logging ---
    logging.basicConfig(level=logging.DEBUG) 
    handler = logging.StreamHandler()
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.DEBUG)

    # --- Config ---
    app.config.from_object('app.config.Config')
    app.config["MONGODB_HOST"] = os.environ.get("MONGO_URI")

    # --- Extensions ---
    db.init_app(app)
    CORS(app)  # No need to limit to /api since it's same origin now
    socketio.init_app(app)
    register_socketio_events(socketio)

    # --- Blueprints ---
    app.register_blueprint(signup_bp, url_prefix="/api")
    app.register_blueprint(login_bp, url_prefix="/api")
    app.register_blueprint(result_bp, url_prefix='/api')
    app.register_blueprint(live_bp, url_prefix='/api')
    app.register_blueprint(signup_admin_bp, url_prefix='/api')

    # --- Serve React Frontend ---
    @app.route('/') 
    @app.route('/<path:path>')
    def serve_react(path='index.html'):
        return send_from_directory(app.static_folder, path) #static folder for SPA

    return app
