from flask import Blueprint, request, jsonify
from app.dal import Dal
import logging

logging.basicConfig(level=logging.INFO)

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    instrument = data.get('instrument')

    if not all([username, password, instrument]):
        return jsonify({'message': 'Missing fields'}), 400

    dal = Dal()  # Instantiate Dal
    
    try:
        user = dal.create_user(username, password, instrument)
        return jsonify({
            'message': 'User created',
            'user': {
                'username': user.username,
                'instrument': user.instruments 
            }
        }), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 409  # Username exists
    except Exception as e:
        logging.info(e)
        return jsonify({'message': 'Signup failed due to a server error.'}), 505