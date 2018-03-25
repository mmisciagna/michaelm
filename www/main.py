import flask
import logging

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


app = Flask(__name__, static_folder='dist')

@app.route('/')
def index():
  content = [
    {
      "headline": "My name is Michael. I am a Front End Developer and Web Designer living in the Bay Area."
    },
    {
      "title": "About",
      "figure": {
        "image": "michael-amalfi-coast.jpg",
        "alt": "Michael on a boat in the waters off the Amalfi Coast",
        "caption": "Here we see Michael on a boat in the waters off the Amalfi Coast."
      }
    },
    {
      "title": "Services",
      "paragraphs": [
        {
          "subtitle": "Front End Development",
          "text": "Use HTML, CSS, and Javascript to build your website in the most efficient way. The more efficient the better the performance.",
          "text": "This can include setting up and designing CMS (Content Management System) subscription sites, such as <a href=\"https://www.squarespace.com/\" target=\"_blank\" rel=\"noopener\">Squarespace</a> and <a href=\"https://www.wix.com/\" target=\"_blank\" rel=\"noopener\">Wix</a>."
        },
        {
          "subtitle": "Web Design",
          "text": "The design of your website should reflect the service or product that you are promoting. However, the user's experience is equally as important. Together we will make a compelling yet simple layout through which users will have no problem navigating."
        }
      ]
    },
    {
      "title": "Status",
      "paragraphs": [
        {
          "text": "At home in Mountain View, CA currently accepting freelance projects."
        }
      ]
    }
  ]

  return flask.render_template('base.jinja',
      content=content,
      description=description,
      nav=nav,
      title='About')

@app.route('/work/')
def work():
  return flask.render_template('base.jinja',
      description=description,
      nav=nav,
      title='Work')

@app.route('/contact/')
def contact():
  return flask.render_template('base.jinja',
      description=description,
      nav=nav,
      title='Contact')

@app.errorhandler(500)
def server_error(e):
  logging.exception('An error occurred during a request: ' + str(e))
  return 'An internal error occurred.', 500
