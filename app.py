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

@app.route('/snake')
def snakePage():
    return render_template('game.html')

@app.route("/end", methods=["GET", "POST"])
def end_game():
    if request.method == "POST":
        data = request.get_json()
        final_score = data.get("score", 0)
        print("DEBUG final_score from POST:", final_score)
        return ("", 204)  # or some JSON response

    # If GET
    final_score = request.args.get("score", 0)
    print("DEBUG final_score from GET:", final_score)
    return render_template("end-game.html", final_score=final_score, best_score=0)

if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=5000)