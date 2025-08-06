import { StandardDeck } from './decks';
import PlayingCardPile from './PlayingCardPile';

describe('PlayingCardPile', () => {
  it('should generate standard 52 card decks', () => {
    const deck = StandardDeck();
    expect(deck).toHaveLength(52);
  });

  it('should allow drawing cards', () => {
    const deck = StandardDeck();
    const hand1 = new PlayingCardPile();
    const hand2 = new PlayingCardPile();

    hand1.drawFrom(deck, 5);
    hand2.drawFrom(deck, 5);

    expect(hand1).toHaveLength(5);
    expect(hand2).toHaveLength(5);
    expect(deck).toHaveLength(42);

    expect(hand1.toString()).not.toBe(hand2.toString());
  });

  it('should allow registration of discard piles, allowing graceful reshuffles', () => {
    const deck = StandardDeck();
    const discard = new PlayingCardPile();
    const hand = new PlayingCardPile();

    deck.registerDiscardPile(discard);

    discard.drawFrom(deck, 50);

    expect(deck).toHaveLength(2);
    expect(discard).toHaveLength(50);

    hand.drawFrom(deck, 5);

    expect(hand).toHaveLength(5);
    expect(deck).toHaveLength(47);
    expect(discard).toHaveLength(0);
  });
});
