from flask import Flask, render_template, request, url_for, redirect, make_response, session, g
from flask_wtf import FlaskForm
import os
import datetime

app = Flask(__name__)

@app.route('/')
def indexPage():
    return render_template('index.html')

@app.route('/credits')
def creditsPage():
    return render_template('credits.html')

@app.route('/end')
def endPage():
    return render_template('end-game.html')

@app.route('/snake')
def snakePage():
    return render_template('game.html')


if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=5000)