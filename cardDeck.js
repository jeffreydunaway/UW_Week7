/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = function() {
  // Write function HERE
  let cards = [];
  let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  for (let i = 0; i < suits.length; i++) {
    cards.push({suit: suits[i], val: 10, displayVal: 'Jack'});
    cards.push({suit: suits[i], val: 10, displayVal: 'Queen'});
    cards.push({suit: suits[i], val: 10, displayVal: 'King'});
    cards.push({suit: suits[i], val: 11, displayVal: 'Ace'});
    for (let j = 2; j <= 10; j++) {
      cards.push({suit: suits[i], val: j, displayVal: j.toString()});
    }
  }
  return cards;
}



// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard && 
    randomCard.displayVal && 
    typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);