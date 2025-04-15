from app.models.user import User

'''
This module defines the Data Access Layer (DAL).
'''

class Dal:
    def create_user(self, username, password, instrument, role='user'):
        if User.objects(username=username).first():
            raise ValueError("Username already exists")

        user = User(
            username=username,
            password=password, # i store a raw password for simplicity only,in a real application i'll hash it
            instruments=[instrument],
            role=role
        )
        user.save()
        return user


    def find_user_by_username(self, username):
        # returns the first user found with the given username
        # if no user is found, returns None
        return User.objects(username=username).first() 


    def verify_password(self, user, password):
        return user.password == password 


    def check_if_admin(self, user):
        return user.role == 'admin'