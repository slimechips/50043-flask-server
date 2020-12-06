import os

basedir = os.path.abspath(os.path.dirname(__file__))
 
class Config(object):
    #SECRET KEY
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'A-VERY-LONG-SECRET-KEY'

    #RECAPTCHA PUBLIC KEY
    RECAPTCHA_PUBLIC_KEY = os.environ.get('RECAPTCHA_PUBLIC_KEY') or 'A-VERY-LONG-SECRET-KEY'
    RECAPTCHA_PRIVATE_KEY = os.environ.get('RECAPTCHA_PRIVATE_KEY') or 'A-VERY-LONG-SECRET-KEY'

    # Database configuration
    #Using local sqlite
    #SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    
    #Using MySQL database
    #SQLALCHEMY_DATABASE_URI = 'mysql://dbproject:dbproject@18.140.89.83:3306/BookReview'
    SQLALCHEMY_DATABASE_URI = 'mysql://dbproject:dbproject@10.0.1.50:3306/BookReview'
    SQLALCHEMY_TRACK_MODIFICATIONS = False