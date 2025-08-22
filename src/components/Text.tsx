import { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import Animated from 'react-native-reanimated';

export const Text = forwardRef<RNText, TextProps>((props, ref) => {
  return (
    <RNText
      ref={ref}
      {...props}
      className={`font-sans ${props.className || ''}`}
    />
  );
});

export const AnimatedText = Animated.createAnimatedComponent(Text);
