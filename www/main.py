import config
import flask
import hashlib
import logging
import os

from flask import Flask, redirect, request, send_from_directory
from google.appengine.api import mail
from slugify import slugify


app = Flask(__name__, static_folder='dist')


@app.template_filter('slug')
def filter_slugify(str):
  return slugify(str)


@app.route('/', defaults={'page': 'home', 'project': None})
@app.route('/<page>/', defaults={'project': None})
@app.route('/<page>/<project>/')
def pages(page, project):
  if project and page != 'work':
    return redirect('/')

  contentDir = 'projects' if project else 'pages'
  contentKey = project if project else page
  content = config.getContent(config.CONTENT_ROOT + contentDir)[contentKey]

  return flask.render_template('base.jinja',
                               content=content,
                               nav=config.getNav())


@app.route('/contact-form/', methods=['POST'])
def contact_form():
  form_entries = {}
  form_entries['name'] = request.form.get('name')
  form_entries['email'] = request.form.get('email')
  form_entries['message'] = request.form.get('message')

  sender = (config.Mail['SENDER'].format(
            form_entries['name'].replace(' ', '_'))
           )
  body = (config.Mail['BODY'].format(form_entries['message'],
                                     form_entries['name'],
                                     form_entries['email'])
         )

  mail.send_mail(sender=sender,
                 to=config.Mail['TO'],
                 subject=config.Mail['SUBJECT'],
                 body=body.lstrip()
                )

  return flask.jsonify(form_entries)


@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'),
                             'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.errorhandler(500)
def server_error(e):
  if config.PROD:
    return redirect('/')

  logging.exception('An error occurred during a request: ' + str(e))
  return 'An internal error occurred.', 500
