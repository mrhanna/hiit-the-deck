import type { Suit } from './cards/PlayingCard';

export type DifficultySuitMap = Record<Suit, number>;
export interface Difficulty {
  name: string;
  config: DifficultySuitMap;
}

function createDifficultySuitMap(
  hearts: number,
  diamonds: number,
  clubs: number,
  spades: number,
): DifficultySuitMap {
  return { hearts, diamonds, clubs, spades };
}

function createDifficulty(name: string, config: DifficultySuitMap): Difficulty {
  return { name, config };
}

export const DEFAULT_DIFFICULTIES = {
  EASY: createDifficulty('Easy', createDifficultySuitMap(5, 10, 15, 20)),
  MEDIUM: createDifficulty('Medium', createDifficultySuitMap(15, 20, 25, 30)),
  HARD: createDifficulty('Hard', createDifficultySuitMap(20, 25, 30, 35)),
  WHO_HURT_YOU: createDifficulty(
    'Who Hurt You??',
    createDifficultySuitMap(20, 30, 40, 50),
  ),
};
