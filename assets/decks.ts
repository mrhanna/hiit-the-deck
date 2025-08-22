import { HIITDeckLibrary } from '@/common/HIITDeck';
import exercises from './exercises';

const decks: HIITDeckLibrary = {
  '4odu50esmqk0': {
    id: '4odu50esmqk0',
    name: 'HIIT',
    map: {
      two: exercises['351w500sg680'], // High Knees (x2, each side)
      three: exercises['9dz7ivk1nao'], // DB Squat Press
      four: exercises['4odu50esmqk0'], // Lateral DB Lunge (each side)
      five: exercises['6mtptugitg0'], // Walking DB Lunge (each side)
      six: exercises['6qiejfnwo1o0'], // Leg Lift and Press
      seven: exercises['3rr7ydpcmew0'], // Band Curl (each side)
      eight: exercises['2bb2zncj8mkg'], // DB/KB Snatch (each side)
      nine: exercises['43l99aac6mk0'], // Mountain Climbers (each side)
      ten: exercises['47e872dt2qq0'], // KB Swing
      jack: exercises['6ehurygo56w0'], // Burpees
      queen: exercises['6ehurygo56w1'], // Push-Ups
      king: exercises['59qmkmu6zag0'], // Squat Jumps
      ace: exercises['c25xufipu6g'], // Pull-ups
      joker: {
        ...exercises['7p99xjy2hsc'], // Treadmill Sprint
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
  // Calisthenics deck
  calisthenics: {
    id: 'calisthenics',
    name: 'Calisthenics',
    map: {
      two: exercises['59qmkmu6zag0'], // Squat Jumps
      three: exercises['43l99aac6mk0'], // Mountain Climbers (each side)
      four: exercises['46cvwj5qvzc0'], // Skaters (each side)
      five: exercises['70713ebrxoc0'], // Sit-Thrus (each side)
      six: exercises['379wpxgtheo0'], // Bicycles (each side)
      seven: exercises['c25xufipu6g'], // Pull-Ups
      eight: exercises['6szoo0b1nro0'], // Flutter Kicks
      nine: exercises['uvhcqzyicrk'], // Incline Push-Ups
      ten: exercises['6s7gwx3gwv80'], // Strict Push-Ups
      jack: exercises['612oqki9m780'], // Dips
      queen: exercises['5qfz49l25bk0'], // Plank Walk-Outs
      king: exercises['1r3qmqo3ackg'], // Supermans
      ace: exercises['6ehurygo56w0'], // Burpees
      joker: {
        ...exercises['1u3ekb8h59i8'], // Wall Hand-Stand
        quantity: {
          fixed: '30',
          unit: 'seconds',
        },
      },
    },
  },
  // Weight-Lifting deck
  'weight-lifting': {
    id: 'weight-lifting',
    name: 'Weight-Lifting',
    map: {
      two: exercises['220i24ikc3fk'], // DB Seated Military Press
      three: exercises['55gooe9e2gw0'], // Incline DB Bench Press
      four: exercises['64u91sfqcdw0'], // Cable Row Machine
      five: exercises['67ed1h2eslw0'], // DB Lateral Raise
      six: exercises['51lmmemgggc0'], // Flat Barbell Bench Press
      seven: exercises['5dhgzymap4k0'], // DB Hammer Curl (each side)
      eight: exercises['2w3r0kmt0ti0'], // Cable Triceps Push-Down
      nine: exercises['2e58sa0f9e80'], // Barbell Squat
      ten: exercises['55150u7yj440'], // DB Lunge (each side)
      jack: exercises['6fxxtn4gqz00'], // Heavy Calf Raise Machine
      queen: exercises['1jwmo89bytxc'], // DB Deadlift
      king: exercises['grybayuutuo'], // Hanging Knee Raise
      ace: exercises['3owvexf2z140'], // Decline DB Sit-Up
      joker: {
        exercises: [
          {
            ...exercises['uvhcqzyicrk'], // Incline Push-Up
          },
          {
            ...exercises['612oqki9m780'], // Dips
          },
        ],
        quantity: {
          fixed: 2,
          unit: 'sets',
        },
      },
    },
  },
};

export default decks;
