from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import time

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {"time": time.time()}

if __name__ == "__main__":
    app.run(debug=True)
