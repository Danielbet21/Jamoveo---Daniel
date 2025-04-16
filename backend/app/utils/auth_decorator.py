from functools import wraps
from flask import request, jsonify
from app.utils.auth_utils import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"message": "Token missing"}), 401

        token = auth_header.split(" ")[1]
        user_data = decode_token(token)

        if not user_data:
            return jsonify({"message": "Invalid or expired token"}), 403

        return f(user_data=user_data, *args, **kwargs)

    return decorated
