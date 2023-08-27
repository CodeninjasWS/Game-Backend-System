const fs = require('fs');

// Read the input JSON file
fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input JSON file:', err);
    return;
  }

  try {
    const parsedData = JSON.parse(data);
    const inputData = parsedData.items; // Assuming items contain the array of entries
    const processedData = [];

    // Process each entry in the input JSON
    inputData.forEach(entry => {
      const { player, player: { name, public_uid } } = entry;
      const processedEntry = {
        name: name || public_uid, // Use player name if available, otherwise use public_uid
        id: player.id,
        points: entry.score,
        avatar: '', // You can add logic here to handle avatars
      };
      processedData.push(processedEntry);
    });

    // Write the processed data to a new JSON file
    fs.writeFile('processed_output.json', JSON.stringify(processedData, null, 2), 'utf8', err => {
      if (err) {
        console.error('Error writing the processed output JSON file:', err);
        return;
      }
      console.log('Processed data has been written to processed_output.json');
    });
  } catch (parseError) {
    console.error('Error parsing input JSON:', parseError);
  }
});
