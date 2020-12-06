from flask import Flask, render_template, url_for, flash, redirect, request
from app import app, bcrypt, db
from models import Review
import time, json
import random
import pymysql
import mysql.connector as database
from flask.json import jsonify
import pymongo
import time
from copy import deepcopy


#React page
@app.route('/book')
def get_book():
    return {"bookTitle": "IDK WTF IS GOING ON lol", "bookDescription": "THIS IS A DESCRIPTION"}

@app.route('/books', methods=['GET', 'POST'])
def add_book():
    books = request.get_json('books')
    print(json.dumps(books))
    #myclient = pymongo.MongoClient("mongodb://3.1.212.62:27017/")
    myclient = pymongo.MongoClient("mongodb://dbproject:dbproject@3.1.212.62:27017")
    mydb = myclient["book_meta"]
    mycol = mydb["bookmeta"]
    mycol.insert_one(books)
    print("Added")
    return("SUCCESS")


@app.route('/review', methods=['GET', 'POST'])
def handle_review():
    review = request.get_json('review')
    print(json.dumps(review))
    #book_review = Review(rating=review['rating'],bookTitle=review['bookTitle'],author=review['author'],description=review['description'])
    book_review = Review(asin=review['asin'],helpful='[0, 0]',overall=review['overall'],reviewText=review['reviewText'],reviewTime=time.strftime("%m %d, %Y",time.localtime()),reviewerID=review['reviewerID'],reviewerName=review['reviewerName'],summary=review['summary'],unixReviewTime=str(int(time.time())))
    db.session.add(book_review)
    db.session.commit()
    return(json.dumps(review))


@app.route('/search', methods=['GET', 'POST'])
def handle_search():
    book_list = []
    bookID = ""
    #Search reviews from mysql
    search = request.get_json('search')
    #print(json.dumps(search))
    search = search['search']

    myclient = pymongo.MongoClient("mongodb://dbproject:dbproject@3.1.212.62:27017")
    mydb = myclient["book_meta"]
    mycol = mydb["bookmeta"]

    mydoc = mycol.find({"author":search}) 
    for x in mydoc:
        del x['_id']
        book_list.append(x)

        
    if (book_list == []):
        mydoc = mycol.find({"bookTitle":search}) 
        for x in mydoc:
            del x['_id']
            book_list.append(x)


        if book_list == []:
            mydoc = mycol.find({"asin":search})
            for x in mydoc:
                del x['_id']
                book_list.append(x)
    
    print("From MongoDB:",book_list)

    #return("suecess")
    if book_list == []:
        return([])
    else:
        return(jsonify(book_list))

  
@app.route('/review_search', methods=['GET', 'POST'])
def handle_review_search():
   
    search = request.get_json('review_search')
    #print(json.dumps(search))

    conn = database.connect(host='18.140.89.83',user='dbproject',password='dbproject',database="BookReview",auth_plugin='mysql_native_password')
    search = search['title']
    print("I AM SEARCHING:",search)
    cur = conn.cursor()
    cur.execute("SELECT * FROM reviews where asin='%s'"%search)
    row_headers = [x[0] for x in cur.description]
    result = cur.fetchall() 
    json_data = []
    for m in result:
        json_data.append(dict(zip(row_headers,m)))
    print("From MySQL:",json.dumps(json_data))
    return jsonify(json_data)
  
@app.route('/sort', methods=['GET', 'POST'])
def handle_sort():
    sort_list = []
    conn = database.connect(host='18.140.89.83',user='dbproject',password='dbproject',database="BookReview",auth_plugin='mysql_native_password')
    cur = conn.cursor()
    cur.execute("SELECT asin, COUNT(asin) AS dup_cnt FROM reviews GROUP BY asin HAVING (dup_cnt >= 1) ORDER BY `dup_cnt` DESC LIMIT 10")
    result = cur.fetchall() 
    for x in result:
        print(x)

    myclient = pymongo.MongoClient("mongodb://dbproject:dbproject@3.1.212.62:27017")
    mydb = myclient["book_meta"]
    mycol = mydb["bookmeta"]
    return("success")


    
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

    conn = database.connect(host='18.140.89.83',user='dbproject',password='dbproject',database="BookReview",auth_plugin='mysql_native_password')
    cur = conn.cursor()
    #cur.execute("SELECT * FROM test where (bookTitle='%s') OR (author='%s')" %(search,search))
    cur.execute("SELECT * FROM reviews where reviewerName='%s'"%search)
    row_headers = [x[0] for x in cur.description]
    result = cur.fetchall() 
    json_data = []
    for m in result:
        json_data.append(dict(zip(row_headers,m)))
    print("Reviews:",json.dumps(json_data))
    
    return (jsonify(json_data)
'''