const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

// Enable CORS
app.use(cors({
  origin: 'https://dashboard.hungrygiraffe.xyz', // Replace with your frontend's URL
  credentials: true,
}));

app.get('/api/missions', (req, res) => {
    const missions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/missions.json'));
    res.json(missions);
  });

  app.get('/api/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/messages.json'));
    res.json(messages);
  });

app.get('/api/bounties', (req, res) => {
  const bounties = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/bounties.json'));
  res.json(bounties);
});

app.get('/api/leaderboards', (req, res) => {
  const users = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/leaderboards.json'));
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  res.json(sortedUsers);
});


app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json'));
  res.json(upcomingMissions);
});

// Initialize users as an empty array
let users = [];

app.post('/api/users', async (req, res) => {
  console.log('Received user registration request:', req.body);

  const newUser = req.body;

  try {
    // Read the existing users from the JSON file
    const usersData = fs.readFileSync('/home/cnwestsprings/game-backend-system/users.json', 'utf8');
    const users = JSON.parse(usersData);

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === newUser.username);
    if (existingUser) {
      console.log('Username already exists');
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    // Update the password with the hashed version
    newUser.password = hashedPassword;

    // Generate a unique ID for the new user
    newUser.id = uuidv4();

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array to the JSON file
    fs.writeFile('/home/cnwestsprings/game-backend-system/users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing users file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });

    console.log('User registration successful:', newUser);

    res.json({ message: 'User registration successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
    console.log('Received login request:', req.body);
  
    const { username, password } = req.body;
  
    // Check if the user exists
    const user = users.find((user) => user.username === username);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log('Login successful');
   return res.status(200).json({ message: 'success!!', userid: user.id });
    //return res.status(200).json({message: user.id});

  });
  
  // Load users from the JSON file on server start
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
    } else {
      users = JSON.parse(data);
      console.log('Users loaded successfully');
    }
  });
 




  app.get('/dashboard', (req, res) => {
    const userId = req.cookies.userId;
    const user = users.find((user) => user.id === userId);
  
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.render('dashboard', { user });
  });
  

app.get('/api/users/:userId', (req, res) => {
  const users = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/users.json'));
  const userId = req.params.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    console.log('User not found');
    return res.status(404).json({ error: 'User not found' });
  }

  const { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar } = user;
  const userProfile = { id, username, name, age, gender, skills, hobbies, school, residentialArea, passionateAbout, avatar };

  res.json(userProfile);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/missions', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'missions.html'));
});


app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'leaderboard.html'));
});

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const missions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/missions.json'));
  const upcomingMissions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json'));

  // Filter missions based on matching keywords
  const filteredMissions = missions.filter((mission) =>
    mission.keywords.some((keyword) => keyword.includes(query))
  );
  // Filter upcoming missions based on matching keywords
  const filteredUpcomingMissions = upcomingMissions.filter((mission) =>
    mission.keywords.some((keyword) => keyword.includes(query))
  );

  // Combine the filtered results
  const searchResults = [...filteredMissions, ...filteredUpcomingMissions];

  res.json(searchResults);
});
app.get('/api/allmissions', (req, res) => {
  const missions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/missions.json'));
  const upcomingMissions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json'));

  const allMissions = missions.map(mission => {
    const isUpcoming = upcomingMissions.some(upcoming => upcoming.id === mission.id);

    return {
      ...mission,
      upcoming: isUpcoming
    };
  });

  res.json(allMissions);
});
app.post('/api/addmission', (req, res) => {
  const { missionId, playerId } = req.body;

  // Read the users from the JSON file
  const users = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/users.json'));

  // Find the user by ID
  const user = users.find((user) => user.id === playerId);

  if (!user) {
    console.log('Player not found');
    return res.status(404).json({ error: 'Player not found' });
  }

  // Add the mission ID to the user's ongoingMissions array
  user.ongoingMissions.push(missionId);

  // Save the updated users array to the JSON file
  fs.writeFileSync('/home/cnwestsprings/game-backend-system/users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'Mission added to player' });
});

app.post('/api/completemission', (req, res) => {
  const { missionId, playerId } = req.body;

  // Read the users from the JSON file
  let users = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/users.json'));

  // Find the user by ID
  const userIndex = users.findIndex((user) => user.id === playerId);

  if (userIndex === -1) {
    console.log('Player not found');
    return res.status(404).json({ error: 'Player not found' });
  }

  // Add the mission ID to the user's completedMissions array
  if (!users[userIndex].completedMissions) {
    users[userIndex].completedMissions = []; // Initialize completedMissions array if it doesn't exist
  }
  users[userIndex].completedMissions.push(missionId);

  // Save the updated users array to the JSON file
  fs.writeFileSync('/home/cnwestsprings/game-backend-system/users.json', JSON.stringify(users, null, 2));

  res.json({ message: 'Mission added to player' });
});

app.post('/api/missions', (req, res) => {
  const newMission = req.body;

  // Read the missions from the JSON file
  const missions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/missions.json'));

  // Assign a unique ID to the new mission
  newMission.id = uuidv4();

  // Add the new mission to the missions array
  missions.push(newMission);

  // Save the updated missions array to the JSON file
  fs.writeFileSync('/home/cnwestsprings/game-backend-system/missions.json', JSON.stringify(missions, null, 2));

  res.json({ message: 'Mission added successfully', mission: newMission });
});

app.post('/api/leaderboards', (req, res) => {
  const leaderboardData = req.body;

  // Assuming the leaderboardData is an array of leaderboard entries

  // Read the existing leaderboard data from a file or database
  const existingData = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/leaderboards.json'));

  // Append the new data to the existing leaderboard
  const updatedData = existingData.concat(leaderboardData);

  // Update the leaderboard in the server's memory or database
  fs.writeFileSync('/home/cnwestsprings/game-backend-system/leaderboards.json', JSON.stringify(updatedData, null, 2));

  // Send a success response
  res.json({ message: 'Leaderboard updated successfully' });
});




app.get('/api/upcoming-missions', (req, res) => {
  const upcomingMissions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json'));
  res.json(upcomingMissions);
});

app.post('/api/upcoming-missions', (req, res) => {
  const newMission = req.body;

  // Read the upcoming missions from the JSON file
  const upcomingMissions = JSON.parse(fs.readFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json'));

  // Assign a unique ID to the new mission
  newMission.id = uuidv4();

  // Add the new mission to the upcoming missions array
  upcomingMissions.push(newMission);

  // Save the updated upcoming missions array to the JSON file
  fs.writeFileSync('/home/cnwestsprings/game-backend-system/upcomingMissions.json', JSON.stringify(upcomingMissions, null, 2));

  res.json({ message: 'Upcoming mission added successfully', mission: newMission });
});


// Start the server
app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});