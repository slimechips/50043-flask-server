from app import db

'''
class Review(db.Model):
    __tablename__='reviews' #Set the tablename
    idx = db.Column(db.Integer, primary_key=True)
    asin = db.Column(db.String(10), unique=True, nullable=False)
    helpful = db.Column(db.String(65535), nullable=True)
    overall = db.Column(db.Integer)
    reviewText = db.Column(db.String(65535), nullable=True)
    reviewTime = db.Column(db.String(65535), nullable=True)
    reviewerID = db.Column(db.String(65535), nullable=True)
    reviewerName = db.Column(db.String(65535), nullable=True)
    summary = db.Column(db.String(65535), nullable=True)
    unixReviewTime = db.Column(db.String(65535), nullable=True)
'''

class Review(db.Model):
    __tablename__='test' #Set the tablename
    rating = db.Column(db.Integer)
    bookTitle = db.Column(db.String(65535), nullable=False,primary_key=True)
    author = db.Column(db.String(65535), nullable=False)
    description = db.Column(db.String(65535), nullable=False)

        
class User(db.Model):
    __tablename__='users' #Set the tablename
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
        