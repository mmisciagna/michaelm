import config
import flask
import logging
import os
import yaml

from flask import Flask, redirect, request, send_from_directory
from google.appengine.api import mail


app = Flask(__name__, static_folder='dist')

def getContent(dir):
  content = {}
  path = os.getcwd() + dir + '/'
  for root, dirs, filenames in os.walk(path):
    for f in filenames:
      with open(root + f, 'r') as ymlfile:
        content[f.split('.')[0]] = yaml.load(ymlfile)
  return content

def getNav():
  nav = []
  content = getContent(config.content_path + 'pages')
  for key in content:
    nav.append({
      'label': content[key]['title'],
      'path': content[key]['path'],
      'order': content[key]['order']
    })
  return nav


@app.route('/', defaults={'page': 'home', 'project': None})
@app.route('/<page>/', defaults={'project': None})
@app.route('/<page>/<project>/')
def pages(page, project):
  contentDir = 'pages'
  contentKey = page

  if project:
    if page != 'work':
      return redirect('/')
    contentDir = 'projects'
    contentKey = project

  content = getContent(config.content_path + contentDir)[contentKey]

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


@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'),
                             'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.errorhandler(500)
def server_error(e):
  if config.env == 'dev':
    logging.exception('An error occurred during a request: ' + str(e))
    return 'An internal error occurred.', 500

  return redirect('/')
