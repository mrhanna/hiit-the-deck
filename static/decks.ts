import { HIITDeckLibrary } from '@/src/common/HIITDeck';
import exercises from './exercises';

const decks: HIITDeckLibrary = {
  '4odu50esmqk0': {
    id: '4odu50esmqk0',
    name: 'HIIT',
    map: {
      two: exercises['351w500sg680'],
      three: exercises['9dz7ivk1nao'],
      four: exercises['4odu50esmqk0'],
      five: exercises['6mtptugitg0'],
      six: exercises['6qiejfnwo1o0'],
      seven: exercises['3rr7ydpcmew0'],
      eight: exercises['2bb2zncj8mkg'],
      nine: exercises['43l99aac6mk0'],
      ten: exercises['47e872dt2qq0'],
      jack: exercises['6ehurygo56w0'],
      queen: exercises['6ehurygo56w1'],
      king: exercises['59qmkmu6zag0'],
      ace: exercises['c25xufipu6g'],
      joker: {
        ...exercises['7p99xjy2hsc'],
        quantity: {
          us: {
            fixed: '1/4',
            unit: 'mi',
          },
          metric: {
            fixed: '400',
            unit: 'm',
          },
        },
      },
    },
  },
};

export default decks;
