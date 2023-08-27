
This repository contains a Node.js application that serves various API endpoints and provides a basic front-end for user registration and login. The application uses Express.js as the web server, and it includes features for managing missions, user data, and leaderboards. Here is a list of the available endpoints:

1.  **GET /api/missions**
    
    -   Description: Fetches a list of missions.
    -   Response: Returns a JSON array of missions.
2.  **GET /api/bounties**
    
    -   Description: Fetches a list of bounties.
    -   Response: Returns a JSON array of bounties.
3.  **GET /api/leaderboards**
    
    -   Description: Fetches a list of users sorted by their points in descending order.
    -   Response: Returns a JSON array of users.
4. **GET /message**
    
    -   Description: Shows the most recent message added.

5.  **GET /api/upcoming-missions**
    
    -   Description: Fetches a list of upcoming missions.
    -   Response: Returns a JSON array of upcoming missions.
6.  **POST /api/users**
    
    -   Description: Registers a new user.
    -   Request Body: Expects a JSON object containing user registration data, including `username`, `password`, and other optional user information.
    -   Response: Returns a success message if registration is successful.
7.  **POST /api/login**
    
    -   Description: Logs in an existing user.
    -   Request Body: Expects a JSON object containing `username` and `password`.
    -   Response: Returns a success message and sets a user ID cookie on successful login.
8.  **GET /dashboard**
    
    -   Description: Renders the user's dashboard view based on their logged-in state and user ID cookie.

9.  **GET /api/users/:userId**
    
    -   Description: Fetches user profile data based on the provided `userId` parameter.
    -   Request Parameter: `userId` (string) - The unique identifier of the user.
    -   Response: Returns a JSON object containing user profile data.
10.  **GET /**
    
    -   Description: Serves the login page view.
11.  **GET /logout**
    
    -   Description: Serves the logout page view.
12.  **GET /index**
    
    -   Description: Serves the index page view.
13.  **GET /register**
    
    -   Description: Serves the user registration page view.
14.  **GET /missions**
    
    -   Description: Serves the missions page view.
15.  **GET /nft**
    
    -   Description: Serves the NFT page view.
16.  **GET /leaderboard**
    
    -   Description: Serves the leaderboard page view.
17.  **GET /api/search**
    
    -   Description: Performs a keyword-based search on missions and upcoming missions.
    -   Query Parameter: `query` (string) - The keyword to search for.
    -   Response: Returns a JSON array of matching missions.
18.  **POST /api/addmission**
    
    -   Description: Adds a mission to a user's ongoing missions list.
    -   Request Body: Expects a JSON object containing `missionId` and `playerId`.
    -   Response: Returns a success message if the mission is added successfully.
19.  **POST /api/completemission**
    
    -   Description: Adds a mission to a user's completed missions list.
    -   Request Body: Expects a JSON object containing `missionId` and `playerId`.
    -   Response: Returns a success message if the mission is added to completed missions successfully.
20.  **POST /api/missions**
    
    -   Description: Adds a new mission to the list of missions.
    -   Request Body: Expects a JSON object containing mission data including `title`, `description`, and other optional fields.
    -   Response: Returns a success message and the newly created mission object.
21.  **POST /api/leaderboards**
    
    -   Description: Updates the leaderboard with new leaderboard entries.
    -   Request Body: Expects a JSON array of leaderboard entries.
    -   Response: Returns a success message.
22.  **POST /api/upcoming-missions**
    
    -   Description: Adds a new mission to the list of upcoming missions.
    -   Request Body: Expects a JSON object containing mission data including `title`, `description`, and other optional fields.
    -   Response: Returns a success message and the newly created upcoming mission object.

## How to Run the Application

1.  Install Node.js and npm on your machine.
2.  Clone this repository and navigate to the project folder.
3.  Install the required dependencies by running `npm install`.
4.  Run the application using the command `node app.js`.
5.  The server will start, and you can access the endpoints and views using a web browser or an API client like Postman.

Please note that this is a basic implementation, and for production use, additional security measures, error handling, and other improvements should be implemented.
