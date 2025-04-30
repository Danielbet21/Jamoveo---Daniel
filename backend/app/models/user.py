from mongoengine import Document, StringField, ListField
'''
This module defines the User model for the app.
It uses MongoEngine to define the schema for user data in the database.
'''

class User(Document): # Document is a class that represents a collection in MongoDB
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    instruments = ListField(StringField(), default=[])
    role = StringField(default='user', choices=('user', 'admin'))
    
    meta = {'collection': 'users'} # Specify the collection name in MongoDB


    def convert_user_details_to_dict(self):
        # Convert the User object to a dictionary representation for mongoengine 
        return {
            "id": str(self.id),
            "username": self.username,
            "instruments": self.instruments,
            "role": self.role
        }
