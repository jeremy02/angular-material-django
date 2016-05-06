# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('customerFirstname', models.CharField(default=None, max_length=255, blank=True)),
                ('customerLastname', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('customerPhone', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('customerPhone2', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('comment', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('date_added', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=None, max_length=255, blank=True)),
                ('tagline', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('description', models.CharField(default=None, max_length=255, null=True, blank=True)),
                ('logo', models.ImageField(default=None, null=True, upload_to=b'company_images', blank=True)),
                ('date_added', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EmployeeProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_type', models.CharField(max_length=128)),
                ('date_added', models.DateTimeField(auto_now=True)),
                ('companies', models.ManyToManyField(default=None, related_name=b'Companies', null=True, to='flexcomms.Company', blank=True)),
                ('company', models.ForeignKey(default=None, blank=True, to='flexcomms.Company', null=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='comments',
            name='company',
            field=models.ForeignKey(default=None, blank=True, to='flexcomms.Company', null=True),
            preserve_default=True,
        ),
    ]
