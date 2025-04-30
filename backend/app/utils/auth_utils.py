import jwt
from datetime import datetime, timedelta
from flask import current_app

'''
This module provides utility functions for generating and decoding JWT tokens.
'''

def generate_token(user):
    payload = {
        "username": user.username,
        "role": user.role,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    return jwt.encode(payload, str(current_app.config["SECRET_KEY"]), algorithm="HS256")

def decode_token(token):
    try:
        return jwt.decode(token, str(current_app.config["SECRET_KEY"]), algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
