export type Suit = 'clubs' | 'hearts' | 'spades' | 'diamonds';

export const RANKS = [
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
  'joker',
] as const;

export type Rank = (typeof RANKS)[number];

const RANK_MAP: Record<Rank, { abbreviation: string; value: number }> = {
  ace: { abbreviation: 'A', value: 1 },
  two: { abbreviation: '2', value: 2 },
  three: { abbreviation: '3', value: 3 },
  four: { abbreviation: '4', value: 4 },
  five: { abbreviation: '5', value: 5 },
  six: { abbreviation: '6', value: 6 },
  seven: { abbreviation: '7', value: 7 },
  eight: { abbreviation: '8', value: 8 },
  nine: { abbreviation: '9', value: 9 },
  ten: { abbreviation: 'T', value: 10 },
  jack: { abbreviation: 'J', value: 11 },
  queen: { abbreviation: 'Q', value: 12 },
  king: { abbreviation: 'K', value: 13 },
  joker: { abbreviation: 'Jo', value: 14 },
};

export default class PlayingCard {
  private _rank: Rank;
  private _suit: Suit | 'joker';

  constructor(rank: Rank, suit?: Suit) {
    if (!suit && rank !== 'joker') {
      throw new Error('Suit must be specified unless rank is Joker');
    }

    this._rank = rank;
    this._suit = suit ?? 'joker';
  }

  set rank(rank: Rank) {
    this._rank = rank;

    if (rank === 'joker') {
      this._suit = 'joker';
    }
  }

  get rank() {
    return this._rank;
  }

  set suit(suit: Suit | 'joker') {
    if (this._rank !== 'joker' && suit === 'joker') {
      throw new Error('Suit must not be joker if rank is not joker');
    }

    this._suit = suit;
  }

  get suit() {
    return this._suit;
  }

  get abbreviate() {
    return {
      rank: RANK_MAP[this.rank].abbreviation,
      suit: this.suit === 'joker' ? '' : PlayingCard.unicode(this.suit),
    };
  }

  get value() {
    return RANK_MAP[this.rank].value;
  }

  isFace() {
    return ['jack', 'queen', 'king'].includes(this.rank);
  }

  isJoker() {
    return this.rank === 'joker';
  }

  isAce() {
    return this.rank === 'ace';
  }

  toString() {
    return `${this.abbreviate.rank}${this.suit === 'joker' ? '' : this.abbreviate.suit}`;
  }

  static readonly abbreviate = (rank: Rank) => RANK_MAP[rank].abbreviation;
  static readonly unicode = function unicode(suit: Suit | 'joker') {
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
