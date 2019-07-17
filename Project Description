Project Name – My Meeting Planner  
Project Description - This is a meetings scheduling system. It has all the features mentioned below. There are two separate parts of the application. A Frontend developed and deployed using the technologies mentioned below and a REST API (with real-time functionalities) created using the technologies mentioned below.  
 
Frontend Technologies used - HTML5, CSS3, JS, Bootstrap and Angular 
Backend Technologies used - NodeJS, ExpressJS and Socket.IO 
Database used - MongoDB
 
Features of the Application -  
 1) User management System : 
 a) Signup - User can sign up on the platform providing all details like FirstName, LastName, Email and Mobile number with Country code. If user wants to sign-up as an admin, he can select the checkbox of ‘Are you an admin’ and enter the Admin Passcode to sign-up as Admin.
 b) Login - user can login into the system using the credentials provided at signup. 
c) Forgot password - User can reset their password by clicking on Forgot Password. This will send them a link on their registered e-mail id from where they can reset the password.

2) User Authorization system :
  a) User can be of two roles, normal and admin. Admin is identified with a username ending with "admin", like "alex-admin" is an admin, since it ends with "admin".
 
3) User Slots management system (Flow for normal User):
  a) Upon login, normal User is taken to a dashboard showing his current month’s planned meetings, in the form of a calendar. Current day-cell is selected by default. 
 b) User can only view his meeting slots and he cannot make any changes.
 
4) User Slots management system (Flow for Admin User):
  a) Upon login, admin user is taken to a dashboard, showing all normal users in a list format 
 b) Upon clicking on any user, admin is taken to user's current calendar, with current date selected, by default.  
c) Admin can add/delete/update meetings on any day, by clicking on a appropriate day-cell/timeline.  
d) These details are stored in database for every user.  
 
5) User Alerts management system:
 a) Normal User gets notified in real time, though an alert if he is online, and email (irrespective of whether he is online or offline), when  
i) A meeting is created by admin 
ii) A meeting is changed by admin 
 iii) 1 minute before meeting, with an option to snooze or dismiss. If snoozed, alert come again in 5 seconds, if snoozed again, it re-appears in next 5 seconds and so on. Once dismissed, alert no longer appears. 
 
6) Planner Views:
 The view follows the following guidelines:
a) Normal User Flow: 
i) Planner shows only current year, user cannot visit past and future years . 
 ii) User should be able to change months, through an arrow button(or prev/next button), each month should show all the dates in tabular format, like in actual calendar. 
iii) There is a blue dot for each meeting on Day Cell and a yellow dot for meeting which are overlapping with other meetings. 
iv) Upon clicking the day's cell, a view pops, showing all meetings, along a 24 hr timeline, with the slots covering the exact duration of each meeting.
 v) Upon clicking on a meeting, its details pops up in another view 
b) Admin Flow:
  i) For admin, a create button is there in calendar view, to create a meeting. 
ii) Upon clicking on create button, details view open. 
iii) Once created, it appears on the calendar view.  
iv) Upon clicking on an already created meeting, same details view opens.
 v) Details view is a form  
vi) Admin can make changes in meeting details form, and submit. 
vii) Admin can delete a meeting as well, with another button 
viii) Meeting details include the start time, end time, title, description, and place of meeting. Also, by default username of the admin, who kept the meeting, is also there in non-editable format.

7) Error Views and messages:
Each major error response (like 404 or 500) is handled with a different page. Also, all kind of errors, exceptions and messages are handled properly on frontend. The user will be aware all the time on frontend about what is happening in the system.


Note: You can find the solution files for frontend and backend at below locations:

Meeting planner frontend:  https://github.com/huny/my-meeting-planner
Meeting planner backend: https://github.com/huny/my-meeting-planner-backend
