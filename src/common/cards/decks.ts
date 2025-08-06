import PlayingCard, { Rank, Suit } from './PlayingCard';
import PlayingCardPile from './PlayingCardPile';

export function StandardDeck({
  suits = ['clubs', 'hearts', 'spades', 'diamonds'],
  ranks = [
    'ace',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'jack',
    'queen',
    'king',
  ],
  jokers = 0,
}: {
  suits?: Suit[];
  ranks?: Rank[];
  jokers?: number;
} = {}) {
  const deck = new PlayingCardPile();

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.cards.push(new PlayingCard(rank, suit));
    });
  });

  for (let i = 0; i < jokers; i++) {
    deck.cards.push(new PlayingCard('joker'));
  }

  return deck;
}

export function EuchreDeck() {
  return StandardDeck({
    ranks: ['nine', 'ten', 'jack', 'queen', 'king', 'ace'],
  });
}
