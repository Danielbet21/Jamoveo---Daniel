'''
This file contains the configuration settings for the Flask application.
'''
import os
class Config:
   

    SECRET_KEY = str(os.getenv("SECRET_KEY", "default_secret"))

