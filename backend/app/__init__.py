import eventlet
eventlet.monkey_patch()

import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from flask_mongoengine import MongoEngine

from app.routes.auth_routes import signup_bp, login_bp, result_bp, live_bp, signup_admin_bp
from app.routes.socketio_routes import register_socketio_events

load_dotenv()

db = MongoEngine()
socketio = SocketIO(cors_allowed_origins=[
    "https://jamoveo-daniel-cxob.vercel.app",
    "http://localhost:5173"
], async_mode='eventlet')

def create_app():
    app = Flask(__name__)
    logging.basicConfig(level=logging.DEBUG)
    app.logger.setLevel(logging.DEBUG)

    app.config.from_object('app.config.Config')

    db.init_app(app)

    CORS(app, resources={r"/api/*": {"origins": [
        "https://jamoveo-daniel-cxob.vercel.app",
        "http://localhost:5173"
    ]}}, supports_credentials=True)

    socketio.init_app(app)

    app.register_blueprint(signup_bp, url_prefix='/api')
    app.register_blueprint(login_bp, url_prefix='/api')
    app.register_blueprint(result_bp, url_prefix='/api')
    app.register_blueprint(live_bp, url_prefix='/api')
    app.register_blueprint(signup_admin_bp, url_prefix='/api')

    register_socketio_events(socketio)

    return app
