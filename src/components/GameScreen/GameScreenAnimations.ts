import { Keyframe } from 'react-native-reanimated';
import { KeyframeProps } from 'react-native-reanimated/lib/typescript/commonTypes';

const _out = {
  transform: [
    {
      translateX: 500,
    },
    {
      rotate: '75deg',
    },
  ],
} satisfies KeyframeProps;

const _in = {
  transform: [
    {
      translateX: 0,
    },
    {
      rotate: '0deg',
    },
  ],
} satisfies KeyframeProps;

export const slideIn = new Keyframe({
  0: _out,
  100: _in,
});

export const slideOut = new Keyframe({
  0: _in,
  100: _out,
});
