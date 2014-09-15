from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'django_website_app.views.home'),
)
