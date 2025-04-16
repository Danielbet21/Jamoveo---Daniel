from mongoengine import Document, StringField, ListField, DictField
'''
This module defines the Song model for the application.
It uses MongoEngine to define the schema for song data in the database.
'''

class Song(Document): # Document is a class that represents a collection in MongoDB
    title = StringField(required=True, unique=True)
    artist = StringField(required=True)
    lyrics_and_chords = ListField(DictField(), required=True)    
    
    meta = {'collection': 'songs'} # Specify the collection name in MongoDB


    def convert_song_details_to_dict(self):
        # Convert the Song object to a dictionary representation for mongoengine 
        return [{
        'title': song.title,
        'artist': song.artist,
        'lyrics_and_chords': song.lyrics_and_chords
    } for song in songs]