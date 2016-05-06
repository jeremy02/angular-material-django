# angular-material-django
This is a demo app that has been done using djngo framework for the back end and angular material on the front end.It simulates a commenting system for a company where the admin can create companies.creates employees and asssigns them to acompany,the employees create comments or collect comments fo\rom the company customers.

#Customer Feedback Web App

Basically a web-based prototype tool using Django web framework for collecting customer
feedback. There are 3 user roles for this app: Admin, Employee, and Customer. Admins manage the
system and view feedback. Employees use the app to solicit feedback from customers. Finally,
customers use the app to give ratings and feedback.
There are 2 main interfaces: an administrative back end (accessible to admins) and a front end
(accessible to employees and customers)
#User Stories
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
