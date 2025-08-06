import PlayingCard from './PlayingCard';

test('basic functionality', () => {
  const threeClubs = new PlayingCard(PlayingCard.THREE, PlayingCard.CLUBS);
  const kingHearts = new PlayingCard(PlayingCard.KING, PlayingCard.HEARTS);
  const joker = new PlayingCard(PlayingCard.JOKER);

  expect(threeClubs.rank.value).toBe(3);
  expect(threeClubs.suit).toBe(PlayingCard.CLUBS);
  expect(threeClubs.toString()).toBe('3\u2663');

  expect(kingHearts.isFace()).toBe(true);
  expect(threeClubs.isFace()).toBe(false);

  threeClubs.rank = PlayingCard.QUEEN;
  threeClubs.suit = PlayingCard.DIAMONDS;

  expect(threeClubs.rank).toBe(PlayingCard.QUEEN);
  expect(threeClubs.toString()).toBe('Q\u2666');

  expect(joker.rank).toBe(PlayingCard.JOKER);
  expect(joker.toString()).toBe('Jo');
});

// it('should not allow invalid cards', () => {
//     expect(() => { new PlayingCard(0, PlayingCard.CLUBS) }).toThrow();
//     expect(() => { new PlayingCard(2) }).toThrow();
//     expect(() => { new PlayingCard('K', 4) }).toThrow();

//     const threeClubs = new PlayingCard(3, PlayingCard.CLUBS);
//     expect(() => { threeClubs.rank = 16 }).toThrow();
// });
