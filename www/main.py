import flask
import logging
import os
import yaml

from flask import Flask


description = "Hello, my name is Michael. I am a Front End Developer and Web Designer living in the San Francisco Bay Area."

nav = [
  {
    "label": "About",
    "path": "/",
  },
  {
    "label": "Work",
    "path": "/work/",
  },
  {
    "label": "Contact",
    "path": "/contact/",
  },
]


def getContent():
  content = {}
  path = os.getcwd() + '/www/content/pages/'
  for root, dirs, filenames in os.walk(path):
    for f in filenames:
      with open(root + f, 'r') as ymlfile:
        content[f.split('.')[0]] = yaml.load(ymlfile)
  return content

def getNav():
  nav = []
  content = getContent()
  for key in content:
    nav.append({
      'label': content[key]['title'],
      'path': content[key]['path'],
      'order': content[key]['order']
    })
  return nav


app = Flask(__name__, static_folder='dist')

@app.route('/', defaults={'path': 'home'})
@app.route('/<path>/')
def index(path):
  if path:
    contentKey = path

  content = getContent()[contentKey]

  return flask.render_template('base.jinja',
      content=content,
      nav=getNav(),
      title=content['title'])

@app.errorhandler(500)
def server_error(e):
  logging.exception('An error occurred during a request: ' + str(e))
  return 'An internal error occurred.', 500
