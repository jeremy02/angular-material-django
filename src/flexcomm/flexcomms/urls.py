from django.conf.urls import patterns, url
from flexcomms import views

urlpatterns = patterns('',
        #NOT USED
        #url(r'^$', views.index, name='index'),

        url(r'^companies/$', views.companies, name='companies'),
        url(r'^comments/$', views.comments, name='comments'),
        #url(r'^companies/$', views.companies, name='companies'),
        url(r'^userRegistration/$', views.userRegistration, name='userRegistration'),
        url(r'^employeeProfile/$', views.employeeProfile, name='employeeProfile'),
        url(r'^login/$', views.login, name='login'),
        url(r'^updateUserProfile/$', views.updateUserProfile, name='updateUserProfile')
)

