from app import create_app, socketio

app = create_app()

@app.route('/')
def home():
    return "Welcome to JaMoveo! Please navigate to the correct page."
    btn = '<a href="/login">Login</a>'
    return f"{btn}"

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)
