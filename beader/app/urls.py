from django.conf.urls import patterns, url

from app import views

urlpatterns = patterns('',
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /new
    url(r'^new$', views.design, name='new'),
    # ex: /save
    url(r'^save$', views.save, name='save'),
    # ex: /pattern/5
	url(r'^pattern/(?P<pattern_id>\d+)$', views.image, name='single'),
    # ex: /pattern/5.png
	url(r'^pattern/(?P<pattern_id>\d+).png$', views.image, name='image'),
    # ex: /design/5/edit
    # TODO
    # ex: /design/5/save
    # TODO
    # ex: /login
    url(r'^login$', views.login, name='login'),
    # ex: /logout
    url(r'^logout$', views.logout, name='logout'),
)