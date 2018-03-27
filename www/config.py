import os


if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
  env = 'prod'
else:
  env = 'dev'


content_path = '/www/content/'


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
