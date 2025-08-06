import PlayingCard, { Rank, Suit } from './PlayingCard';
import PlayingCardPile from './PlayingCardPile';

export function StandardDeck({
  suits = [
    PlayingCard.CLUBS,
    PlayingCard.HEARTS,
    PlayingCard.SPADES,
    PlayingCard.DIAMONDS,
  ],
  ranks = [
    PlayingCard.ACE,
    PlayingCard.TWO,
    PlayingCard.THREE,
    PlayingCard.FOUR,
    PlayingCard.FIVE,
    PlayingCard.SIX,
    PlayingCard.SEVEN,
    PlayingCard.EIGHT,
    PlayingCard.NINE,
    PlayingCard.TEN,
    PlayingCard.JACK,
    PlayingCard.QUEEN,
    PlayingCard.KING,
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
    deck.cards.push(new PlayingCard(PlayingCard.JOKER));
  }

  return deck;
}

export function EuchreDeck() {
  return StandardDeck({
    ranks: [
      PlayingCard.NINE,
      PlayingCard.TEN,
      PlayingCard.JACK,
      PlayingCard.QUEEN,
      PlayingCard.KING,
      PlayingCard.ACE,
    ],
  });
}
