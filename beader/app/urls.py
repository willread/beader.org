from django.conf.urls import patterns, url

from app import views

urlpatterns = patterns('',
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /design
    url(r'^design/$', views.design, name='design'),
)