const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
const CardPlayer = function(name) {
  // Create player function here
  this.name = name;
  this.hand = [];
  this.drawCard = function() {
    const card = blackjackDeck[Math.floor(Math.random() * 52)];
    this.hand.push(card);
  };
};

// Create two new CardPlayers
let dealer = new CardPlayer('Dealer');
let player = new CardPlayer('Player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of cards
 * @returns {Object} - total points and whether hand isSoft
 */
const calcPoints = function(hand) {
  let hasAce = false;
  let handScore = 0;
  let isSoft = false;

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];

    if (card.displayVal === 'Ace') {
      hasAce = true;
      handScore += 1;
    } else {
      handScore += card.val;
    }
  }
  if (handScore <= 11 && hasAce) {
    handScore += 10;
    isSoft = true;
  }
  return {
    total: handScore,
    isSoft: isSoft
  };
};

const dealerShouldDraw = function(dealerHand) {
  let points = calcPoints(dealerHand).total;
  let isSoft = calcPoints(dealerHand).isSoft;
  if (points < 17 || (points === 17 && isSoft)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore
 * @param {number} dealerScore
 */
const determineWinner = function(playerScore, dealerScore) {
  if (playerScore > dealerScore) {
    return `Your total of ${playerScore} beat the dealer's total of ${dealerScore}.  You win!`;
  } else if (playerScore < dealerScore) {
    return `The dealer's total of ${dealerScore} beat your total of ${playerScore}.  You lose!`;
  } else {
    return `The dealer's total of ${dealerScore} equaled your total of ${playerScore}.  Tie!`;
  }
};

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count
 * @param {string} dealerCard
 */
const getMessage = function(count, dealerCard) {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`;
};

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player
 */
const showHand = function(player) {
  let displayHand = player.hand.map(function(card) {
    return card.displayVal;
  });
  console.log(
    `${player.name}'s hand is ${displayHand.join(', ')} (${
      calcPoints(player.hand).total
    })`
  );
};

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);
  showHand(dealer);
  while (dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    showHand(dealer);
  }
  let dealerScore = calcPoints(dealer.hand).total;
  if (dealerScore > 21) {
    return 'Dealer went over 21, you win!';
  } else {
    console.log(`Dealer stays at ${dealerScore}`);
  }

  return determineWinner(playerScore, dealerScore);
};
// console.log(startGame());
