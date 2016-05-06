from django.db import models

# Create your models here.

from django.db import models
import datetime
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db.models import IntegerField, Model
from django.core.validators import MaxValueValidator, MinValueValidator

from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=255,blank=True, default = None)
    tagline = models.CharField(max_length=255,null=True, blank=True, default = None)
    description = models.CharField(max_length=255,null=True, blank=True, default = None)
    logo = models.ImageField(upload_to="company_images",null=True, blank=True, default = None)
    date_added = models.DateTimeField(auto_now=True,null=True, blank=True)

class Comments(models.Model):
    company = models.ForeignKey(Company,null=True, blank=True, default = None)
    customerFirstname = models.CharField(max_length=255,blank=True, default = None)
    customerLastname = models.CharField(max_length=255,null=True, blank=True, default = None)
    customerPhone = models.CharField(max_length=255,null=True, blank=True, default = None)
    comment = models.CharField(max_length=255,null=True, blank=True, default = None)
    date_added = models.DateTimeField(auto_now=True,null=True, blank=True)

class EmployeeProfile(models.Model):
    #This line is required.Links user profile to a user model instance
    user = models.OneToOneField(User)
    #The additional attributes for determining the type of user
    user_type  = models.CharField(max_length=128)
    company = models.ForeignKey(Company,null=True, blank=True, default = None)
    companies = models.ManyToManyField(Company,related_name='Companies',null=True, blank=True, default = None)
    date_added = models.DateTimeField(auto_now=True)        