import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import img from "../assets/images/logo_2.png"

export default function EmojiSticker({ imageSize }) {
  const scaleImage = useSharedValue(imageSize);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });



  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: 253,
        },
        {
          translateY: 288,
        },
      ],
    };
  });

  return (
    <Animated.View style={[containerStyle, { top: -350 }]}>
      <Animated.Image
        source={img}
        resizeMode="contain"
        style={[imageStyle, { width: imageSize, height: imageSize }]}
      />
    </Animated.View>
  );
}
