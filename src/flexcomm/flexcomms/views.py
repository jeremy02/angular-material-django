# Create your views here.

#from django.db import models

# Create your models here.
# Create your views here.
from _threading_local import local
"""
from numpy.distutils.command.develop import develop
from oauthlib.oauth1.rfc5849.signature import verify_hmac_sha1
from twisted.internet.defer import succeed
from twisted.web.http import datetimeToString
"""

# Create your views here.




from django.shortcuts import redirect, render


import time
import csv


from django.shortcuts import render
from django.http import HttpResponseBadRequest


from django.db.models import Q,F

from django.db.models import Count, Avg,Sum
from django.db.models import Count, Min, Sum, Avg,Max

#from dateutil import parser
from django.shortcuts import redirect, render


import itertools
from itertools import chain,groupby

import operator
from operator import itemgetter,attrgetter
from django.utils.dateformat import DateFormat, TimeFormat

import json

from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.core.mail import mail_admins

from django.db.models import Q

from django.db.models import Count, Avg,Sum
from django.db.models import Count, Min, Sum, Avg,Max

#from dateutil import parser


#handling json block
from django.core import serializers
#from rest_framework import status
#from rest_framework.decorators import api_view
#from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt

from django.core.serializers.json import DjangoJSONEncoder



#from rest_framework import status
#from rest_framework.decorators import api_view
#from rest_framework.response import Response


import requests
import json

import re

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.paginator import Paginator


from django.shortcuts import render_to_response, redirect, render
from django.contrib.auth import logout as auth_logout
#from django.contrib.auth.decorators import login_required
# from django.template.context import RequestContext


from django.http import *
from django.shortcuts import render_to_response
from django.template import RequestContext
#from django.utils import simplejson
import socket

#from django.contrib.auth.hashers import check_password,make_password
#from django.contrib.auth import login as django_login, authenticate, logout as django_logout


from django.contrib.comments.templatetags.comments import render_comment_form
from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.template.loader import get_template
from django.template import Context
#from django.utils import simplejson

from django.shortcuts import redirect, render



import json
import jwt

from django.shortcuts import render
from django.http import HttpResponseBadRequest


from django.db.models import Q

from django.db.models import Count, Avg,Sum
from django.db.models import Count, Min, Sum, Avg,Max

#from dateutil import parser
from django.shortcuts import redirect, render




from datetime import datetime,date, datetime, time,timedelta


#from dateutil import parser as dateparser
#from dateutil.rrule import rrule, DAILY
#from dateutil import rrule
import itertools
from itertools import chain,groupby
from functools import reduce
from operator import and_, or_
import operator
from django.utils.dateformat import DateFormat, TimeFormat

import json

from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.core.mail import mail_admins

from django.db.models import Q

from django.db.models import Count, Avg,Sum
from django.db.models import Count, Min, Sum, Avg,Max

#from dateutil import parser


#handling json block
"""
from django.core import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from nauri.serializers import FuelDeviceCashDetailsSerializer,DeviceSerializer,ReceiptSerializer
"""

#import the forms
#from nauri.forms import UserForm,ClientForm,DeviceForm,Assigned_VehicleForm,DeviceUsersForm,LoginForm,UserProfileForm,SaccoForm
# Import the models
from django.contrib.auth.models import User

from flexcomms.models import Company,EmployeeProfile,Comments

import requests
import json

import re

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.paginator import Paginator

from django.views.decorators.csrf import csrf_exempt, csrf_protect
#from strgen import StringGenerator as SG


def index(request):
    # Request the context of the request.
    # The context contains information such as the client's machine details, for example.
    context = RequestContext(request)

    # Construct a dictionary to pass to the template engine as its context.
    # Note the key boldmessage is the same as {{ boldmessage }} in the template!
    context_dict = {'boldmessage': "I am bold font from the context"}

    # Return a rendered response to send to the client.
    # We make use of the shortcut function to make our lives easier.
    # Note that the first parameter is the template we wish to use.
    return render_to_response('flexcomms/index.html', context_dict, context)

def merge_values(values):
    grouped_results = itertools.groupby(values, key=lambda value: value['id'])
    merged_values = []
    for k, g in grouped_results:
        groups = list(g)
        merged_value = {}
        for group in groups:
            for key, val in group.iteritems():
                if not merged_value.get(key):
                    merged_value[key] = val
                elif val != merged_value[key]:
                    if isinstance(merged_value[key], list):
                        if val not in merged_value[key]:
                            merged_value[key].append(val)
                    else:
                        old_val = merged_value[key]
                        merged_value[key] = [old_val, val]
        merged_values.append(merged_value)
    return merged_values


#CREATE A JWT TOKEN FOR ANGULARJS HEADERS AUTHENTICATION
def createAuthToken(user):

    #payload = {}
    user = user
    tokenSecret = 'myUniqueSecret'

    payload = {
        "user": user,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(days=7)
    }

    token = jwt.encode(payload, tokenSecret, algorithm='HS256')

    return token



@csrf_exempt
def userRegistration(request):
    message = ''
    data = ''
    context_dict = []

    print "user yes"

    if request.method == 'POST':
        """
        firstname = request.body['firstname']
        lastname = request.body['lastname']
        username = request.body['username']
        password = request.body['password']
        """

        #print(json.loads(request.body.decode("utf-8")))
        postedData = json.loads(request.body)

        firstname = postedData['firstname']
        lastname = postedData['lastname']
        username = postedData['username']
        password = postedData['password']

        if firstname=="":
            message = "Please enter your firstname"
        elif lastname=="":
            message = "Please enter your lastname"
        elif username=="":
            message = "Please enter your username"
        elif password=="":
             message = "Please enter your password"
        else:
            try:
                obj = User.objects.get(username = username)
                print "The user exists.Please login"
                message = "The user exists.Please login"
            except User.DoesNotExist:
                obj = User.objects.create(first_name=firstname, last_name=lastname,username = username)
                obj.save()
                # Now we hash the password with the set_password method.
                # Once hashed, we can update the user object.
                obj.set_password(password)
                obj.save()

                message = "User was successfully created."

    else:

        print "request.get"


    context_dict = {'message':message,'data':data}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))



@csrf_exempt
def login(request):
    message = ''
    data = ''
    token = ''
    context_dict = []

    print "user yes"

    if request.method == 'POST':

        postedData = json.loads(request.body)

        username = postedData['username']
        password = postedData['password']

        if username=="":
            message = "Please enter your username"
        elif password=="":
             message = "Please enter your password"
        else:
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    #login(request, user)
                    auth.login(request, user)

                    if request.user.is_superuser:
                        print "Hello, admin."
                    else:
                        print "Hello, ordinary visitor."


                    #readAsjson = serializers.serialize('json', User.objects.filter(username = username), fields=('username','firstname'))
                    #profiles = merge_values(EmployeeProfile.objects.filter(user = user).values('id','user__username','user__first_name','user__last_name','user__is_staff','companies__id', 'companies__name','date_added'))
                    #data = list(profiles)

                    #Not a fancy answer ####just the object in json notation.

                    queryset = User.objects.filter(username = username).values('id','username', 'first_name', 'last_name','is_active', 'is_superuser','is_staff', 'last_login','date_joined')
                    serializedUserObject = json.dumps(list(queryset), cls=DjangoJSONEncoder)

                    justObjectResult = serializedUserObject[1:-1]

                    token = createAuthToken(justObjectResult)

                    message = "Cheers!You have logged in..."


                else:
                    # Return a 'disabled account' error message
                    message = "Sorry!!!Your account has been disabled.Contact admin."
            else:
                # Return an 'invalid login' error message.
                message = "Invalid login details.Please try again!!!"

    else:

        print "request.get"

        #userProfile = merge_values(EmployeeProfile.objects.filter(user__id = 1).values())
        #data = list(userProfile)

        profiles = merge_values(EmployeeProfile.objects.filter(user__id = 1).values('id','user__username','user__first_name','user__last_name','user__is_staff','companies__id', 'companies__name','date_added'))
        data = list(profiles)

    context_dict = {'message':message,'data':data,'token':token}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))


@csrf_exempt
@login_required
def updateUserProfile(request):
    message = ''
    data = ''
    context_dict = []

    print "user yes"

    if request.method == 'POST':
        postedData = json.loads(request.body)

        firstname = postedData['firstname']
        lastname = postedData['lastname']
        username = postedData['username']
        password = postedData['password']

        if firstname=="":
            message = "Please enter your firstname"
        elif lastname=="":
            message = "Please enter your lastname"
        elif username=="":
            message = "Please enter your username"
        elif password=="":
             message = "Please enter your password"
        else:
            try:
                obj = User.objects.filter(username = username)

                userObjUpdate = obj.get()
                userObjUpdate.first_name=firstname
                userObjUpdate.last_name=lastname
                userObjUpdate.username = username
                #userObj.save()

                userObjUpdate.save(update_fields=['first_name','last_name','username'])

                userObjUpdate.set_password(password)
                userObjUpdate.save()

                print "The user exists.Please login"
                message = "The user was succesfully updated!!!"
            except User.DoesNotExist:
                #YOU CAN CREATE THE USER BY UNCOMMENTING THE CODE HERE
                """
                obj = User.objects.create(first_name=firstname, last_name=lastname,username = username)
                obj.save()
                # Now we hash the password with the set_password method.
                # Once hashed, we can update the user object.
                obj.set_password(password)
                obj.save()

                message = "User does not exist but was successfully created."
                """
                message = "User does not exist."

    else:

        print "request.get"


    context_dict = {'message':message,'data':data}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))

@csrf_exempt
def employeeProfile(request):
    message = ''
    data = ''
    context_dict = []

    print "user yes"

    if request.method == 'POST':
        postedData = json.loads(request.body)

        companyId = postedData['companyId']
        userId = postedData['userId']
        print userId

        if companyId and userId:

            company = Company.objects.get(id = companyId)
            user = User.objects.get(id = userId)

            print user.username

            #check later for the updateOrCreate Method
            if company and user:
                try:
                    #profile = EmployeeProfile.objects.filter(user = user)
                    profile = EmployeeProfile.objects.get(user = user)

                    #profile = profile.get()
                      
                    if company.employeeprofile_set.filter(companies=company).exists() or EmployeeProfile.objects.filter(companies=company).exists():
                        message = "The employee is already added to the company."
                    else:
                        #profile = profile[0]
                        profile.company = company
                        profile.save()

                        profile.companies.add(company)
                        #profile.save()
                       
                        message = "The user profile was successfully updated!!!"
                
                except EmployeeProfile.DoesNotExist:

                    #SET THE SYMMETRICAL TO FALSE IF NECESSARRY IN THE MODELS FOR THE MANY_TO_MANY FIELD

                    profile = EmployeeProfile(user=user,company=company)
                    profile.save()
                    profile.companies.add(company)
                    #profile.save()

                    message = "User Profile was successfully created."
                    print "New sss"
            else:
                message = "Error!!!The Company doesn't exist."
        else:
            message = "Sorry!!!Please refresh and try again!!!"


    elif request.method == 'GET':

        #get the companies the user works for
        if 'userId' in request.GET:
            userId = request.GET['userId']
            profiles = EmployeeProfile.objects.filter(Q(user__id = userId))

            if profiles:

                #profile = merge_values(EmployeeProfile.objects.filter(user__id = userId).values('id','user__username','user__first_name','user__last_name','companies__id', 'companies__name','companies__tagline','companies__description' ,'companies__logo','companies__date_added'))
                profile = EmployeeProfile.objects.filter(user__id = userId).prefetch_related('companies').values('companies__id', 'companies__name','companies__tagline','companies__description' ,'companies__logo','companies__date_added')
                data = list(profile)
                message = "Loading ...companies that have employed you!!!"
            else:
                message = "Sorry!!!You dont have a company thats employed you!!!"
                data = []


        else:
            users = User.objects.all()
            if users:
                users = users.values('id','username', 'first_name', 'last_name','is_active', 'is_superuser','is_staff', 'last_login','date_joined')
                #profiles = profiles.values('id','user__username','user__first_name','companies__id','date_added').select_related('companies').prefetch_related('companies')
                #profiles = merge_values(EmployeeProfile.objects.all().values('id','user__username','user__first_name','companies__id', 'companies__name','date_added'))
                data = list(users)
            else:
                data = []


    else:

        print "Are you serious?"

        profiles = EmployeeProfile.objects.all()
        print profiles

        if profiles:

            #profiles = profiles.values('id','user__username','user__first_name','companies__id','date_added').select_related('companies').prefetch_related('companies')
            profiles = merge_values(EmployeeProfile.objects.all().values('id','user__username','user__first_name','companies__id', 'companies__name','date_added'))
            data = list(profiles)
        else:
            data = []


    context_dict = {'message':message,'data':data}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))

@csrf_exempt
def companies(request):
    message = ''
    data = ''
    context_dict = []



    if request.method == 'POST':

        companyName = request.POST['companyName']
        companyTagline = request.POST['companyTagline']
        companyDescription = request.POST['companyDescription']

        companyLogo = request.FILES['file']

        if "companyName" in request.POST:



            company = Company(name=companyName,tagline = companyTagline,description = companyDescription,logo =companyLogo)
            company.save()

            message = "Company was successfully created!!!"
        else:
            message = "Please upload again!!!!"


    elif request.method == 'GET':

        #GET A SINGLE COMPANIES EMPLOYEES

        if "companyName" in request.GET and "companyId" in request.GET:

            companyName = request.GET['companyName']
            companyId = request.GET['companyId']

            employees = EmployeeProfile.objects.filter(Q(companies__pk=companyId),Q(companies__name = companyName)).distinct()

            if employees:
                employee = employees.values('id','user__username','user__first_name','user__last_name','user__date_joined','date_added')
                data = list(employee)
                message = "Success!!!Employees loaded..."

            else:
                message = "Sorry!!!The companies does not have employees"
                data = []
        else:

            companies = Company.objects.all()
            if companies:
                companies = companies.values('id','name','tagline','description','logo','date_added')
                data = list(companies)
            else:
                data = []

    elif request.method == 'PUT':

        body = json.loads(request.body)
        companyId = body['companyId']
        name = body['name']
        tagline = body['tagline']
        description = body['description']


        if companyId:
            try:
                companyUpdate = Company.objects.filter(Q(id = companyId))

                companyUpdate = companyUpdate.get()


                companyUpdate.name = name
                companyUpdate.tagline = tagline
                companyUpdate.description = description
                companyUpdate.save(update_fields=['name','tagline','description'])
                message = "Company Updated successfully!!!"

            except Comments.DoesNotExist:
                message = "Sorry!!!Company Does Not Exist!!!"

    elif request.method =='DELETE':
           print request.POST
           print request.body

    else:
        message = 'Unknown Request'
        print "Please upload again what!!!!"
        """
        else:
            companies = Company.objects.all()
            if companies:
                companies = companies.values('id','name','tagline','description','logo','date_added')
                data = list(companies)
            else:
                data = []
        """

    context_dict = {'message':message,'data':data}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))


@csrf_exempt
def comments(request):
    message = ''
    data = ''
    context_dict = []



    if request.method == 'POST':

        companyId = request.POST['companyId']
        firstName = request.POST['firstName']
        lastName = request.POST['lastName']
        phoneNumber = request.POST['phoneNumber']
        comment = request.POST['comment']

        if companyId:
            company = Company.objects.filter(id = companyId)
            company = company.get()
            comment = Comments(company = company,customerFirstname = firstName,customerLastname = lastName,customerPhone = phoneNumber,comment = comment)
            comment.save()
            message = "Comment Saved"
            print "Comment Saved"
        else:
            message = "Invalid Comment"
        
    elif request.method =='GET':

        #get a single company comments

        if "companyName" in request.GET and "companyId" in request.GET:

            companyName = request.GET['companyName']
            companyId = request.GET['companyId']

            comments = Comments.objects.filter(Q(company__pk=companyId),Q(company__name = companyName))

            if comments:
                message = "Comments Found"
                comment = comments.values('id','customerFirstname','customerLastname','customerPhone','comment','company__id','company__name','date_added')
                data = list(comment)

            else:
                message = "No Comments Found"
                data = []
        else:

            comments = Comments.objects.all()
            if comments:
                message = "Comments Found"
                comment = comments.values('id','customerFirstname','customerLastname','customerPhone','comment','company__id','company__name','date_added')
                data = list(comment)
            else:
                message = "No Comments Found for the company...."
                data = []

    elif request.method =='PUT':       

        body = json.loads(request.body)
        companyId = body['companyId']
        commentId = body['commentId']
        firstName = body['firstName']
        lastName = body['lastName']
        phoneNumber = body['phoneNumber']
        comment = body['comment']

        if companyId and commentId:
            try:
                commentUpdate = Comments.objects.filter(Q(id = commentId),Q(company__id = companyId))

                commentUpdate = commentUpdate.get()

                commentUpdate.customerFirstname = firstName
                commentUpdate.customerLastname = lastName
                commentUpdate.customerPhone = phoneNumber
                commentUpdate.comment = comment

                commentUpdate.save(update_fields=['customerFirstname','customerLastname','customerPhone','comment'])
                message = "Comment Updated successfully!!!"
            except Comments.DoesNotExist:
                message = "Comment Does Not Exist!!!"
            
            



    elif request.method =='DELETE':
           print request.POST
           print request.body

    else:
        message = 'Unknown Request'    
        print "Please upload again what!!!!"

    context_dict = {'message':message,'data':data}

    return HttpResponse(json.dumps(context_dict, cls=DjangoJSONEncoder))    