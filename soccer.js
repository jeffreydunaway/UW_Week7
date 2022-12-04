const RESULT_VALUES = {
  w: 3,
  d: 1,
  l: 0
};

// This function accepts one argument, the result, which should be a string
// Acceptable values are 'w', 'l', or 'd'
const getPointsFromResult = result => RESULT_VALUES[result];

// Create getTotalPoints function which accepts a string of results
// including wins, draws, and losses i.e. 'wwdlw'
// Returns total number of points won
const getTotalPoints = resultsString => {
  const results = resultsString.split('');

  let totalPoints = 0;
  results.forEach(function(result) {
    totalPoints += getPointsFromResult(result);
  });

  return totalPoints;
};

// create orderTeams function that accepts as many team objects as desired,
// each argument is a team object in the format { name, results }
// i.e. {name: 'Sounders', results: 'wwlwdd'}
// Logs each entry to the console as "Team name: points"
const orderTeams = (...teams) => {
  let standingsString = '';

  teams.forEach(function(team, i) {
    const points = getTotalPoints(team.results);
    standingsString += `${team.name}: ${points}`;
    if (i !== teams.length - 1) {
      standingsString += '\n';
    }
  });
  return standingsString;
};
