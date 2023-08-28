const fs = require('fs');
const bcrypt = require('bcrypt');

// Read the JSON files
const data1 = JSON.parse(fs.readFileSync('usersoutput1.json', 'utf8'));


// Combine all items from the three files
const allItems = [...data1.items];

// Process the items and create the desired output
const output = allItems.map(item => {
    const publicUid = item.public_uid;
    const idNum = item.player_id;
    const username = item.name || publicUid; // Use name if not blank

    if (publicUid && idNum) {
        return {
            username: username,
            password: "",
            id: idNum.toString()
        };
    } else {
        return {
            username: "NULL, There was an error loading user data!",
            password: "",
            id: "null"
        };
    }
});

// Write the output JSON to a file
fs.writeFileSync('output.json', JSON.stringify(output, null, 2));

console.log('Output saved to output.json');
