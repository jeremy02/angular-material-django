# angular-material-django
This is a demo app that has been done using djngo framework for the back end and angular material on the front end.It simulates a commenting system for a company where the admin can create companies.creates employees and asssigns them to acompany,the employees create comments or collect comments fo\rom the company customers.
#Back End
As an admin, I can log into and out of the system
When the admin logs in, they see links to manage employees and companies.
As an admin, I can view / add / edit / delete employees
On the back end, the admin manages a set of employees. Each has a first and last name, and a
password.
As an admin, I can view / add / edit / delete companies
On the back end, the admin manages a set of companies. Each has a company name, tag line,
logo, and description
As an admin, I can assign a company to an employee.
Employees can have multiple companies assigned to them.
As an admin, I can view all the feedback a company has received
On the back end, the admin can select a company and view all the feedback it received. Each
feedback item consists of a customer first and last name, phone number, and comments.
#Front End
As an employee, I can log into and out of the system
When an employee logs in, they are shown a list of all companies assigned to them.
As an employee, I can select a company to receive feedback
On the front end, the employee can click on a company on their company list. This takes them
to the company feedback page, which has the company name, tag line, and logo. It also has a
form to collect feedback, and a way to navigate back to the company list.
As a customer, I can give feedback.
On the front end company feedback page, the customer enters their first and last name, phone
number, and comments, then submits. This clears the form and leaves it ready for the next
customer.

#INSTALLATION INSTRUCTIONS
  #Getting Started Introduction
Here you can find a list of core libraries, design specifications and coding standards that I have used.
    #Google's Material Design
    All libraries and custom made components are following Google's Material Design Specifications.
    #AngularJS
    AngularJS is the core of this web apps template.
    #Angular Material
    Angular Material is the primary library of the this web app. It's a set of AngularJS directives and services that implements Material Design Specifications and it's in active development by Google.
    
    We are using generator-gulp-angular package for quickly bootstrapping the application.
    
    
#Prerequisites
    -Yeoman generator for AngularJS with GulpJS
   - Node.js
    -Git
    -Bower
    -Gulp
    -Django

#Installation
A. Installing Prerequisites
    Download and install the latest Node.js from its web site.
    Download and install the latest Git from its web site.
    Open your favorite console application (Terminal, Command Prompt etc.), run the following command and wait for it to finish:
    
    npm install -g bower
    
    Run the following command and wait for it to finish:

    npm install -g gulp

Now you are ready to install the Fuse.
B. Installing Fuse
    Unzip the zip file that you have downloaded from this git. Inside the zip file, you will find the Skeleton Project (src.zip).
    Extract the contents of the zip file (src.zip) into a folder that you will work within. For this documentation, we will refer that as "your work folder".
    Open your favorite console application (Terminal, Command Prompt etc.), navigate into your work folder, run the following command and wait for it to finish:
    
    npm install

    npm install

    NB:This command will install all the required Node.js modules into the node_modules directory inside your work folder.You may have to delete the folder called node-modules.

    Note: Installing Node.js packages may throw a lot of warnings and errors along the way. As long as the process finishes without any error notes such as "Killed", you will be fine.
    Run the following command and wait it for to finish:

    bower install / bower install --allow-root
    NB:You may have to delete the folder called bower-components
    This command will install all the required bower packages into the bower_components directory inside your work folder.

    And now, you are ready to run the web app for the first time.

C. Running the FFS app

    While still in your work folder, run the following command in the console application:
    gulp serve

    And that's it. Gulp will take care everything and start the web app and the django application inside the folder called flexcomm. Your default browser will be opened automatically, and you will be able to navigate through the web app Make sure the following ports are open 8000,8001,3001 and 3001.
    You can delete the sqlitedb file and start with your inside flexcomm folder and run (python manage.py syc db to create your own db file and start with fresh data).
#to be done
token authentication to replace the django login decorators
implement actual logout of a user
use of django rest framework instead of the DjangoJSONEncoder Django’s serialization framework which translates Django models into other formats(json/xml) to achieve a better REST API

fOR NOW we are using PyJWT for JSON Web authentication nd its performing the encoding but we have to implementing the decoding of user uthentication data on the django back end.

Actual implementation of the delete buttons and functions.

#DEMO LINK WILL BE PROVIDED SOON


