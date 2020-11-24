from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import time, json

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {"time": time.time()}

@app.route('/review', methods=['GET', 'POST'])
def handle_review():
    review = request.get_json('review')
    print(json.dumps(review))
    return(json.dumps(review))

@app.route('/search', methods=['GET', 'POST'])
def handle_search():
    search = request.get_json('search')
    print(json.dumps(search))
    return(json.dumps(search))

if __name__ == "__main__":
    app.run(debug=True)
