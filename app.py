from flask import Flask, render_template, request, url_for, redirect, make_response, session, g
from flask_wtf import FlaskForm
import os
import datetime

app = Flask(__name__)

@app.route('/')
def frontPage():
    return render_template('game.html')


if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=5000)