from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'geostats.views.home'),
    url(r'^blockgroup/(?P<blockgroup_offset>\d+)/$','geostats.views.profile'),
)
