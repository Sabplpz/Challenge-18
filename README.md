# Challenge 18 - Social Media API

## Description

This API was specifically created for Social Media, it helps the app run  many fucntions in the back ground such as adding friends and posting thoughts. This will help our cutomer create a responsive front-end along side this API. While building this API a lot of Mongoose was learnt and cemented into my brain. (LOL).

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Links](#links)

### Installation

Please make sure to have the dependencies "express" and "mongoose", and that "npm install" has been run in the terminal.

### Usage

After installing all of the dependencies, you can run "npm start" to start the API server. You can test the routes in Insomnia while the server is on following the next steps:

User Routes: 
- Create a user (POST http://localhost:3001/api/users/)
  JSON in body:
  {
  "username": "ana",
  "email": "ana@gmail.com"
  }
- Get all users (GET http://localhost:3001/api/users/)
  No body.
- Get a single user (GET http://localhost:3001/api/users/{userId})
  No body.
- Update user (PUT http://localhost:3001/api/users/{userId})
  JSON in body:
  {
  "username": "{New name}",
  "email": "{New email}"
  }
- Delete user (DEL http://localhost:3001/api/users/{userId})
  No body.
- Add friend (POST http://localhost:3001/api/users/{userId}/friends/{friendId})
  No body.
- Delete friend (DEL http://localhost:3001/api/users/{userId}/friends/{friendId})
  No body.
  
Thoughts Routes: 
- Create a thought (POST http://localhost:3001/api/thoughts/{userId})
  JSON in body:
  {
  "thoughtText": "Here's a cool thought...",
  "username": "ana"
  }
- Get all thoughts (GET http://localhost:3001/api/thoughts/)
  No body.
- Get a single thought (GET http://localhost:3001/api/thoughts/{thoughtId})
  No body.
- Update thought (PUT http://localhost:3001/api/thoughts/{thoughtId})
  JSON in body:
  {
  "thoughtText": "Here's a cool thought...",
  "username": "ana"
  }
- Delete thought (DEL http://localhost:3001/api/thoughts/{thoughtId})
  No body.
- Add reaction (POST http://localhost:3001/api/thoughts/{thoughtId}/reactions)
  No body.
- Delete friend (DEL http://localhost:3001/api/thoughts/{thoughtId}/reactions/{reactionId})
  No body.
  

### Credits

Credits to tutor Wesley for his patience explaining and my TAs Ryan and Mateo! And of course, credit to my self :)

### License

This API is released under the MIT License. You are free to use, modify, and distribute this application as per the terms of this license.

### Links

Github: https://github.com/Sabplpz/Challenge-18
Explaining video: https://drive.google.com/file/d/1d50T37OApR1NAt0TRwA-jFj_sIHquEvl/view

