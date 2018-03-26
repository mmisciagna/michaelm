import config
import flask
import logging
import os
import yaml

from flask import Flask, request
from google.appengine.api import mail


app = Flask(__name__, static_folder='dist')


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


@app.route('/', defaults={'path': 'home'})
@app.route('/<path>/')
def pages(path):
  if path:
    contentKey = path
  content = getContent()[contentKey]

  return flask.render_template('base.jinja',
      content=content,
      nav=getNav(),
      title=content['title'])


@app.route('/contact-form/', methods=['POST'])
def contact_form():
  form_entries = {}
  form_entries['name'] = request.form.get('name')
  form_entries['email'] = request.form.get('email')
  form_entries['message'] = request.form.get('message')

  sender = (config.mail['SENDER']
            .format('_'.join(form_entries['name'].split(' ')))
           )
  body = (config.mail['BODY']
          .format(form_entries['message'],
                  form_entries['name'],
                  form_entries['email'])
         )

  mail.send_mail(sender=sender,
                 to=config.mail['TO'],
                 subject=config.mail['SUBJECT'],
                 body=body)

  return flask.jsonify(form_entries)


@app.errorhandler(500)
def server_error(e):
  logging.exception('An error occurred during a request: ' + str(e))
  return 'An internal error occurred.', 500
