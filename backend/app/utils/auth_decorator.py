from functools import wraps
from flask import request, jsonify
from app.utils.auth_utils import decode_token

'''
This module responsible to check if the user is authenticated by verifying the JWT token.
'''

def token_required(f):
    @wraps(f) # wraps is used to preserve the original function's metadata (like name and docstring)
    def decorated(*args, **kwargs):
        """
        If the token is valid, it will decode the token and pass the user data to the view function.
        If the token is missing or invalid, it will return a 401 or 403 response.
        """
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"message": "Token missing"}), 401

        token = auth_header.split(" ")[1]
        user_data = decode_token(token)

        if not user_data:
            return jsonify({"message": "Invalid or expired token"}), 403

        return f(user_data=user_data, *args, **kwargs)

    return decorated
