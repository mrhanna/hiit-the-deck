import PlayingCard from './PlayingCard';
test('basic functionality', () => {
  const threeClubs = new PlayingCard('three', 'clubs');
  const kingHearts = new PlayingCard('king', 'hearts');
  const joker = new PlayingCard('joker');

  expect(threeClubs.suit).toBe('clubs');
  expect(threeClubs.toString()).toBe('3\u2663');

  expect(kingHearts.isFace()).toBe(true);
  expect(threeClubs.isFace()).toBe(false);

  threeClubs.rank = 'queen';
  threeClubs.suit = 'diamonds';

  expect(threeClubs.rank).toBe('queen');
  expect(threeClubs.toString()).toBe('Q\u2666');

  expect(joker.rank).toBe('joker');
  expect(joker.toString()).toBe('Jo');
});

// it('should not allow invalid cards', () => {
//     expect(() => { new PlayingCard(0, PlayingCard.CLUBS) }).toThrow();
//     expect(() => { new PlayingCard(2) }).toThrow();
//     expect(() => { new PlayingCard('K', 4) }).toThrow();

//     const threeClubs = new PlayingCard(3, PlayingCard.CLUBS);
//     expect(() => { threeClubs.rank = 16 }).toThrow();
// });
