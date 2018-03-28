import os
import yaml


env = 'dev'
if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
  env = 'prod'


content_path = '/www/content/'


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
  content = getContent(content_path + 'pages')
  for key in content:
    nav.append({
      'label': content[key]['title'],
      'path': content[key]['path'],
      'order': content[key]['order']
    })
  return nav


mail = {
  'SENDER': '{}@michaelm.appspotmail.com',
  'SUBJECT': 'Michael M. Freelance Job!',
  'TO': 'Michael Misciagna <mmisciagna86@gmail.com>',
  'BODY':
'''Hello Professor,

You've revieved a message:

{}

Sincerely,
{}
{}
'''
}
