from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random

import time, json

app = Flask(__name__)

@app.route('/book')
def get_book():
    return {"bookTitle": "IDK WTF IS GOING ON lol", "bookDescription": "THIS IS A DESCRIPTION"}

@app.route('/review', methods=['GET', 'POST'])
def handle_review():
    review = request.get_json('review')
    print(json.dumps(review))
    return(json.dumps(review))

@app.route('/search', methods=['GET', 'POST'])
def handle_search():
    search = request.get_json('search')
    print(json.dumps(search))
    return{"bookTitle": random.randint(1, 5), "bookDescription": random.randint(6,10)}

if __name__ == "__main__":
    app.run(debug=True)
