import flask
import logging

from flask import Flask


app = Flask(__name__, static_folder='dist')

@app.route('/')
def index():
  return flask.render_template('index.jinja', content="It's alive!")

@app.errorhandler(500)
def server_error(e):
  logging.exception('An error occurred during a request: ' + str(e))
  return 'An internal error occurred.', 500
