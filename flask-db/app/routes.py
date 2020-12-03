from flask import Flask, render_template, url_for, flash, redirect, request
from app import app, bcrypt, db
from models import Review
import time, json
import random
import pymysql
import mysql.connector as database
from flask.json import jsonify



#React page
@app.route('/book')
def get_book():
    return {"bookTitle": "IDK WTF IS GOING ON lol", "bookDescription": "THIS IS A DESCRIPTION"}

@app.route('/review', methods=['GET', 'POST'])
def handle_review():
    review = request.get_json('review')
    print(json.dumps(review))
    book_review = Review(rating=review['rating'],bookTitle=review['bookTitle'],author=review['author'],description=review['description'])
    db.session.add(book_review)
    db.session.commit()
    return(json.dumps(review))

@app.route('/search', methods=['GET', 'POST'])

def handle_search():
    search_result = {}
    index = 1
    flag = 1
    search = request.get_json('search')
    #print(json.dumps(search))

    conn = database.connect(host='18.140.89.83',user='dbproject',password='dbproject',database="BookReview",auth_plugin='mysql_native_password')
    search = search['search']
    cur = conn.cursor()
    cur.execute("SELECT * FROM test where (bookTitle='%s') OR (author='%s')" %(search,search))
    row_headers = [x[0] for x in cur.description]
    result = cur.fetchall() 
    json_data = []
    for m in result:
        json_data.append(dict(zip(row_headers,m)))
    print(json.dumps(json_data))

    return jsonify(json_data)



    
#Testing registration page
'''
a = 1

@app.route('/')
def index():
    return render_template('index.html', title='Home')

@app.route('/register',methods=['GET','POST'])
def register():
    global a
    form = RegisterForm()
    if form.validate_on_submit():
        #commit user to db
        username = form.username.data
        email = form.email.data
        password = bcrypt.generate_password_hash(form.password.data)
        user = User(id=a,username=username,email=email,password=password)
        db.session.add(user)
        db.session.commit()
        flash('Congrats, registeration success!',category='success')
        a += 1
        return redirect(url_for('index'))
    return render_template('register.html',form = form)
'''