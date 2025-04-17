if __name__ == "__main__":
    from app import create_app, socketio
    import os

    app = create_app()
    socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
