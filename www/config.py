import os
import yaml


# Whether we're running in production or not.
PROD = (os.environ.get('PROD') or
        os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'))

# Path to .yaml files holding all site content.
CONTENT_ROOT = '/www/content/'

# Returns all .yaml file content in the given directory as a dict.
def getContent(dir):
  content = {}
  path = os.getcwd() + dir + '/'
  for root, dirs, filenames in os.walk(path):
    for f in filenames:
      with open(root + f, 'r') as ymlfile:
        key = f.split('.')[0]
        content[key] = yaml.load(ymlfile)
  return content

# Gets all page content which uses their files names as keys in a dict. Those
# keys and their corresponding values are used to construct the nav.
def getNav():
  nav = []
  content = getContent(CONTENT_ROOT + 'pages')
  for key in content:
    nav.append({
      'label': content[key]['title'],
      'path': content[key]['path'],
      'order': content[key]['order']
    })
  return nav

# Mail config.
Mail = {
  'SENDER': '{}@michaelm.appspotmail.com',
  'SUBJECT': 'Michael M. Freelance Job!',
  'TO': 'Michael Misciagna <mmisciagna86@gmail.com>',
  'BODY': ('Hello Professor,\n\n'
           'You\'ve revieved a message:\n\n{}\n\n'
           'Sincerely,\n{}\n{}')
}
