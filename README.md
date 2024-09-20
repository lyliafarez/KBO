# Enterprise Search App

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Project Organization](#project-organization)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Database Population](#database-population)
  - [File Upload Process](#file-upload-process)
  - [Database Schemas](#database-schemas)
  - [Swagger](#swagger)

- [App Walkthrough](#app-walkthrough)


## Project Description

The **Enterprise Search App** allows users to search for enterprises based on various criteria such as enterprise number, zip code, name, and activity. Advanced search filters provide more refined results. Authenticated users can add enterprises to their favorites, and there is a detailed enterprise information page.

## Features

- **Search**: Search enterprises by number, zip code, name, or activity.
- **Advanced Search**: Refine searches using additional filters.
- **Enterprise Details**: View detailed information for each enterprise.
- **Favorites**: Authenticated users can save enterprises to their favorites list.

## Project Organization
We generally worked together as a team, distributing tasks across specific functionalities:

**Lylia:** Authentication, advanced search, initial file upload.  
**Kaira:** Design/Frontend, KBO scraping.  
**Gabrielle:** Company data visualization, Swagger documentation.  
**Jemima:** Company website scraping, scraping visualization, adding relationships to models, user profile.  
**Tania:** Search bar, favorites management.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Authentication**: JWT Authentication for user login and protected routes

## Project Setup

### Frontend Setup

To set up the frontend part of the project:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm i
   npm run android
### Backend Setup

To set up the backend part of the project:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm i
   npm start

## Database population
### File Upload Process
- To populate the database using csv files, the path to files inside UploadController should be changed then launch :
- http://localhost:5000/api/upload-entreprise
- http://localhost:5000/api/upload-address
- http://localhost:5000/api/upload-activity
- http://localhost:5000/api/upload-establishment
- http://localhost:5000/api/upload-denomination
- http://localhost:5000/api/upload-contact
- http://localhost:5000/api/upload-code
- http://localhost:5000/api/upload-branch

  
### Database Schemas
- enterprises: Stores information about enterprises.
- users: Contains user authentication data.
- favorites: Tracks users' favorite enterprises.
- activities: Logs different activities related to enterprises.
- codes: Stores various codes associated with enterprises.
- contacts: Contains contact details for each enterprise.
- branches: Information about branches of enterprises.
- denominations: Different denominations related to enterprises.
- addresses: Address details for enterprises.
- establishments: Information about different establishments related to enterprises.

  
  ### Swagger
  - Link to swagger : http://localhost:5000/api-docs/#/

  
## App Walkthrough
1. In the top corner of the screen, you'll find a hamburger menu icon that opens up additional navigation options. Here, you can:
  - Login: Access your account by entering your credentials.
  - Register: Create a new account if you're a new user.
  - User Profile: Check and manage your profile settings and view your favorite enterprises.
  - Home page : Search and find out more about existing enterprises
![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20142152.png)

2. Search Bar: At the top of the page, you'll find a user-friendly search bar where you can enter keywords such as enterprise number, name, or activity. Simply type in your query and hit search to find relevant enterprises quickly.
3. Results List: Below the search bar, a dynamic list of results will appear based on your search criteria. Each result includes essential information about the enterprise, such as its name, number, status, and more. You can click on any enterprise to view detailed information, including its activities, addresses, denominations, and contacts.
![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20142132.png)

4. Advanced Search: For more precise results, we offer an advanced search option. This feature allows you to search based on specific fields such as:
Enterprise Number
Denomination (Name)
Activity
Address (Zipcode)
You can select one or multiple fields to narrow down your search and find exactly what you're looking for
![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20142143.png)

5.For Authenticated Users: Once you're logged in, you can add enterprises to your favorites list directly from the search results. Look for the "Add to Favorites" or "Favorite" button next to each enterprise in the results list. This feature allows you to easily keep track of enterprises that interest you and access them quickly in the future.

![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20143251.png)

6. The details of each enterprise can be viewed by clicking on " view details "

![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20143307.png)

- this part of the enterprise visualisation is scrapped from companyWeb
  ![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/Screenshot%202024-09-20%20143419.png)

7. The user settings and liste of favorites can be found on My profile page :
-  ![Tech Stack](https://github.com/lyliafarez/KBO/blob/main/images/userProfile.png)

   


