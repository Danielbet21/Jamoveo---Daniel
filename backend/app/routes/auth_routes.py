from flask import Blueprint, request, jsonify
from app.dal import Dal
import logging

logging.basicConfig(level=logging.INFO)

# ------------------------------------------------------
# Player Signup Route
# ------------------------------------------------------
signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    instrument = data.get('instrument')

    if not all([username, password, instrument]):
        return jsonify({'message': 'Missing fields'}), 400

    dal = Dal()  # Init Dal
    
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
    
    

# ------------------------------------------------------
# Player Login Route
# ------------------------------------------------------
login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def player_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': True, 'message': 'Missing fields'}), 400

    dal = Dal()
    user = dal.get_user_by_username_and_password(username, password)

    if not user:
        return jsonify({'error': True, 'message': 'Invalid credentials'}), 401

    if dal.check_if_admin(user):
        return jsonify({'error': True, 'message': 'Admin must log in through /admin/login'}), 403

    return jsonify({
        'error': False,
        'message': 'Player login successful',
        'user': {
            'username': user.username,
            'instrument': user.instruments,
            'role': 'user'
        },
        'redirect': '/player'
    }), 200


# ------------------------------------------------------
# Admin Login Route
# ------------------------------------------------------
@login_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': True, 'message': 'Missing fields'}), 400

    dal = Dal()
    user = dal.get_user_by_username_and_password(username, password)

    if not user:
        return jsonify({'error': True, 'message': 'Invalid credentials'}), 401

    if not dal.check_if_admin(user):
        return jsonify({'error': True, 'message': 'Only admins can log in here'}), 403

    return jsonify({
        'error': False,
        'message': 'Admin login successful',
        'user': {
            'username': user.username,
            'instrument': user.instruments,
            'role': 'admin'
        },
        'redirect': '/admin'
    }), 200
    
    
#---------------------------------------------------------------------------
# result route
#---------------------------------------------------------------------------
result_bp = Blueprint('result', __name__)

@result_bp.route('/result', methods=['GET'])
def results():
    search_term = request.args.get('search_term', '').strip()  # Get search term from query parameter

    if not search_term:
        return jsonify({'error': True, 'message': 'Search term is empty'}), 400

    dal = Dal()
    try:
        results = dal.search_songs_matches(search_term)
        if not results:
            return jsonify({
                'error': True,
                'message': 'No songs found'
            }), 401
        return jsonify({
            'error': False,
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': True,
            'message': 'Server error while searching for songs'
        }), 500