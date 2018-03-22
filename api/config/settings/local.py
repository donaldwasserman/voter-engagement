import os

import dj_database_url

from .base import *

BASE_NAME = BASE_DOMAIN = "localhost"
BASE_URL = f"http://{BASE_DOMAIN}:8000"

###############################################################################
# Core

DEBUG = True

SECRET_KEY = 'dev'

INSTALLED_APPS += ['django_extensions']

###############################################################################
# Logging

LOGGING['loggers']['api']['level'] = os.getenv('LOG_LEVEL', 'INFO')

###############################################################################
# Databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'voterengagement_dev',
    },
    'remote': dj_database_url.config(),
}

###############################################################################
# Authentication

AUTH_PASSWORD_VALIDATORS = []

###############################################################################
# Email

DEFAULT_FROM_EMAIL = f"Voter Engagement {BASE_NAME} <noreply@{BASE_DOMAIN}>"

if not (os.getenv('SENDGRID_USERNAME') and os.getenv('SENDGRID_PASSWORD')):
    EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
    EMAIL_FILE_PATH = os.path.join(PROJECT_ROOT, 'tmp', 'emails')
    os.makedirs(EMAIL_FILE_PATH, exist_ok=True)
