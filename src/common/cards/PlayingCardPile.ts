import PlayingCard from './PlayingCard';

export default class PlayingCardPile extends Array<PlayingCard> {
  onOverdraw: () => void;

  constructor(...cards: PlayingCard[]) {
    super(...cards);
    this.onOverdraw = () => {};
  }

  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = this[i];
      this[i] = this[j];
      this[j] = x;
    }
  }

  sortDeck({
    aces = 'low',
    suitOrder = ['clubs', 'hearts', 'spades', 'diamonds'],
    jokers = 'last',
  } = {}) {
    this.sort((a, b) => {
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

      return a.value - b.value;
    });
  }

  flip() {
    this.reverse();
  }

  drawFrom(pile: PlayingCardPile, numberOfCards = 1) {
    for (let i = 0; i < numberOfCards; i++) {
      if (pile.length > 0) {
        const newCard = pile.shift()!; // definitely not undefined since length > 0
        this.push(newCard);
      } else {
        pile.onOverdraw();

        if (pile.length > 0) {
          const newCard = pile.shift()!;
          this.push(newCard);
        } else return false;
      }
    }

    return true;
  }

  absorb(pile: PlayingCardPile) {
    this.push(...pile);
    pile.length = 0; // clear the pile
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
    return this.join(' ');
  }
}
