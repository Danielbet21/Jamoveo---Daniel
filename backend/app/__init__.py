import eventlet
eventlet.monkey_patch()  # Enables async I/O for SocketIO

import os
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
socketio = SocketIO(cors_allowed_origins="*")

'''
This function creates and configures the Flask application instance 
along with its extensions and blueprints.
'''

def create_app():
    app = Flask(__name__)
    

    logging.basicConfig(level=logging.DEBUG) 
    handler = logging.StreamHandler()
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.DEBUG)

    # --- App Configuration ---
    app.config.from_object('app.config.Config')
    app.config["MONGODB_HOST"] = "mongodb://mongo:27017/jamoveo"
    app.config["SECRET_KEY"] = str(os.getenv("SECRET_KEY", "default_secret"))


    # --- Initialize Extensions ---
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    socketio.init_app(app)
    register_socketio_events(socketio)

    # --- Register Blueprints ---
    app.register_blueprint(signup_bp, url_prefix="/api")
    app.register_blueprint(login_bp, url_prefix="/api")
    app.register_blueprint(result_bp, url_prefix='/api')
    app.register_blueprint(live_bp, url_prefix='/api')
    app.register_blueprint(signup_admin_bp, url_prefix='/api')


    return app
