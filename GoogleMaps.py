from flask import flask, render_template

app=Flask(__name__)

@app.route("/")
def index():
  return render_template("GoogleMaps.html")
