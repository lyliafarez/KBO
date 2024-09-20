# Enterprise Search App

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Database Population](#database-population)
  - [File Upload Process](#file-upload-process)
  - [Database Schemas](#database-schemas)
- [How to Add Images](#how-to-add-images)
- [Available Commands](#available-commands)
  - [Frontend Commands](#frontend-commands)
  - [Backend Commands](#backend-commands)
- [App Walkthrough](#app-walkthrough)
- [License](#license)

## Project Description

The **Enterprise Search App** allows users to search for enterprises based on various criteria such as enterprise number, zip code, name, and activity. Advanced search filters provide more refined results. Authenticated users can add enterprises to their favorites, and there is a detailed enterprise information page.

## Features

- **Search**: Search enterprises by number, zip code, name, or activity.
- **Advanced Search**: Refine searches using additional filters.
- **Enterprise Details**: View detailed information for each enterprise.
- **Favorites**: Authenticated users can save enterprises to their favorites list.
- **File Upload**: Upload and populate enterprise data via a CSV file.

## Technologies Used

- **Frontend**: React, Inertia.js, Vue.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Authentication**: JWT Authentication for user login and protected routes
- **File Handling**: `multer` for file uploads, `unzipper` for extracting uploaded zip files

## Project Setup

### Frontend Setup

To set up the frontend part of the project:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend


**Pour le lancement du projet**
### Frontend
- cd frontend
- npm i 
- npm run android

## backend
-  npm i
- npm start
