from app.models.user import User
from app.models.song import Song
import logging
logging.basicConfig(level=logging.INFO)


'''
This module defines the Data Access Layer (DAL).
'''

class Dal:
    def create_user(self, username, password, instrument, role='user'):
        if User.objects(username=username).first():
            raise ValueError("Username already exists")

        user = User(
            username=username,
            password=password, 
            # i store a raw password for simplicity only,in a real application i'll hash it
            instruments=[instrument],
            role=role
        )
        user.save()
        return user

    def verify_password(self, user, password):
        return user.password == password 


    def check_if_admin(self, user):
        return user.role == 'admin'

    def get_user_by_username(self, username):
        return User.objects(username=username).first() 
    
    
    def get_user_instruments(self, user):
        return user.instruments if user else None
    
    
    def get_user_by_id(self, user_id):
        return User.objects(id=user_id).first() if user_id else None
    
    
    def get_users_by_instrument(self, instrument):
        return User.objects(instruments=instrument) if instrument else None
    
    
    def get_user_by_username_and_password(self, username, password):
        user = self.get_user_by_username(username)
        if user and self.verify_password(user, password):
            return user
        return None
    
    
    def search_songs_matches(self, search_string):
        # This method search for songs in the database
        # and returns a list of songs that match the search string.

        songs = Song.objects(title__icontains=search_string) #insensitive search
        if not songs:
            songs = Song.objects(artist__icontains=search_string)
        # Convert Mongo objects to JSON-serializable dicts 
        # for easier handling in the API response.
        return [{
            'title': song.title,
            'artist': song.artist,
            'lyrics_and_chords': song.lyrics_and_chords
        } for song in songs]