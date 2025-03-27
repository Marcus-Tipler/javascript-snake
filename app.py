from flask import Flask, render_template, request
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
        # For POST, both values should be sent in the JSON body.
        final_score = data.get("final_score", 0)
        apples = data.get("apples", 0)
        # Optionally process/store these values before sending a response.
        return ("", 204)  # No content response for POST requests
      
    # For GET, both values should be passed as query parameters.
    final_score = request.args.get("final_score", 0)
    apples = request.args.get("apples", 0)
    
    return render_template("end-game.html", final_score=final_score, apples=apples)

@app.route('/scarePic', methods=['GET', 'POST'])
def jumpPictures():
    imageNumber = request.args.get('imgNum', default = 0, type=int)
    return render_template('jumpscare.html', imgNumb = imageNumber)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
