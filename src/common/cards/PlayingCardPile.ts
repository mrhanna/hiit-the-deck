import PlayingCard from './PlayingCard';

export default class PlayingCardPile {
  cards: PlayingCard[];
  onOverdraw: () => void;

  constructor() {
    this.cards = [];
    this.onOverdraw = () => {};
  }

  get length() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }

  sort({
    aces = 'low',
    suitOrder = [
      PlayingCard.CLUBS,
      PlayingCard.HEARTS,
      PlayingCard.SPADES,
      PlayingCard.DIAMONDS,
    ],
    jokers = 'last',
  } = {}) {
    this.cards.sort((a, b) => {
      if (a.isJoker()) {
        return jokers === 'first' ? -1 : 1;
      }

      if (b.isJoker()) {
        return jokers === 'first' ? 1 : -1;
      }

      const suitPriorityA = suitOrder.indexOf(a.suit);
      const suitPriorityB = suitOrder.indexOf(b.suit);

      if (suitPriorityA !== suitPriorityB) {
        return suitPriorityA - suitPriorityB;
      }

      if (a.isAce()) {
        return aces === 'high' ? 1 : -1;
      }

      if (b.isAce()) {
        return aces === 'high' ? -1 : 1;
      }

      return a.rank.value - b.rank.value;
    });
  }

  flip() {
    this.cards.reverse();
  }

  drawFrom(pile: PlayingCardPile, numberOfCards = 1) {
    for (let i = 0; i < numberOfCards; i++) {
      if (pile.cards.length > 0) {
        const newCard = pile.cards.shift()!; // definitely not undefined since length > 0
        this.cards.push(newCard);
      } else {
        pile.onOverdraw();

        if (pile.cards.length > 0) {
          const newCard = pile.cards.shift()!;
          this.cards.push(newCard);
        } else return false;
      }
    }

    return true;
  }

  absorb(pile: PlayingCardPile) {
    this.cards.push(...pile.cards);
    pile.cards = [];
  }

  registerDiscardPile(
    pile: PlayingCardPile,
    {
      shuffleOnOverdraw = true,
    }: {
      shuffleOnOverdraw?: boolean;
    } = {},
  ) {
    this.onOverdraw = () => {
      this.absorb(pile);
      if (shuffleOnOverdraw) this.shuffle();
    };
  }

  toString() {
    return this.cards.join(' ');
  }
}
