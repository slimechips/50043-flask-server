from flask import Flask, render_template, url_for, flash, redirect
from app import app, bcrypt, db
from forms import RegisterForm
from models import User

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