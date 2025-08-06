export type Suit = 'clubs' | 'hearts' | 'spades' | 'diamonds' | 'joker';

export interface Rank {
  name: string;
  char: string;
  value: number;
}

export default class PlayingCard {
  private _rank: Rank;
  private _suit: Suit;

  constructor(rank: Rank, suit?: Suit) {
    if (!suit && rank !== PlayingCard.JOKER) {
      throw new Error('Suit must be specified unless rank is Joker');
    }

    this._rank = rank;
    this._suit = suit ?? 'joker';
  }

  set rank(rank: Rank) {
    this._rank = rank;

    if (rank === PlayingCard.JOKER) {
      this._suit = 'joker';
    }
  }

  get rank() {
    return this._rank;
  }

  set suit(suit: Suit) {
    if (this._rank === PlayingCard.JOKER) {
      this._suit = 'joker';
    } else {
      this._suit = suit;
    }
  }

  get suit() {
    return this._suit;
  }

  isFace() {
    return [PlayingCard.JACK, PlayingCard.QUEEN, PlayingCard.KING].includes(
      this.rank,
    );
  }

  isJoker() {
    return this.rank === PlayingCard.JOKER;
  }

  isAce() {
    return this.rank === PlayingCard.ACE;
  }

  toString() {
    let value = this.rank.char;

    if (!this.isJoker()) {
      value += PlayingCard.unicode(this.suit);
    }

    return value;
  }

  static readonly CLUBS = 'clubs';
  static readonly HEARTS = 'hearts';
  static readonly SPADES = 'spades';
  static readonly DIAMONDS = 'diamonds';

  static readonly ACE = { name: 'ace', char: 'A', value: 1 };
  static readonly TWO = { name: 'two', char: '2', value: 2 };
  static readonly THREE = { name: 'three', char: '3', value: 3 };
  static readonly FOUR = { name: 'four', char: '4', value: 4 };
  static readonly FIVE = { name: 'five', char: '5', value: 5 };
  static readonly SIX = { name: 'six', char: '6', value: 6 };
  static readonly SEVEN = { name: 'seven', char: '7', value: 7 };
  static readonly EIGHT = { name: 'eight', char: '8', value: 8 };
  static readonly NINE = { name: 'nine', char: '9', value: 9 };
  static readonly TEN = { name: 'ten', char: '10', value: 10 };
  static readonly JACK = { name: 'jack', char: 'J', value: 11 };
  static readonly QUEEN = { name: 'queen', char: 'Q', value: 12 };
  static readonly KING = { name: 'king', char: 'K', value: 13 };
  static readonly JOKER = { name: 'joker', char: 'Jo', value: 14 };

  static readonly unicode = function unicode(suit: Suit) {
    switch (suit) {
      case 'clubs':
        return '\u2663';
      case 'hearts':
        return '\u2665';
      case 'spades':
        return '\u2660';
      case 'diamonds':
        return '\u2666';
    }

    return '';
  };
}
