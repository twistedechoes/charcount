#!/usr/bin/env python

import os
import wsgiref.handlers

from google.appengine.ext import webapp
from google.appengine.api import urlfetch
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template

class MainHandler(webapp.RequestHandler):

  def get(self):
    template_values = {'base_url': 'http://%s/' % self.get_host_name()}
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, template_values))

  def get_host_name(self):
    if os.environ.get('HTTP_HOST'):
      url = os.environ['HTTP_HOST']
    else:
      url = os.environ['SERVER_NAME']
    return url



def main():
  application = webapp.WSGIApplication([('/', MainHandler)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
