## User Access Management System ##

A full-stack user access management system built with Node.js, React, TypeORM, and PostgreSQL. This project supports role-based authentication and access request flows for Employees, Managers, and Admins.

## 1. Introduction ##
## 1.1 Purpose ##
-This system allows:
-User registration and login                                                    
-Role-based redirection                                                                          
-Software access requests                                                                
-Managerial request approvals   
## 1.2 Scope ## 
Core Features:
✅ User Registration (default role: Employee)                         
✅ JWT-based Authentication                                
✅ Software Creation (Admin-only)                             
✅ Access Request Submission (Employee-only)                         
✅ Request Approval/Reject (Manager-only)                             

## Tech Stack ##
Backend: Node.js + Express.js                                         
Frontend: React                                             
Database: PostgreSQL                                   
ORM: TypeORM                              
Authentication: JWT                                
Tooling: bcrypt, dotenv, nodemon                                 

## Setup Instructions ## 
## Backend ## 
cd user-access-backend                           
npm install                       
npm run dev                     

## Frontend ## 
cd user-access-frontend                         
npm install                          
npm start                               



  
