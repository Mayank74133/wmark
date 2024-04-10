import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource ,type ,val ,valProp}) {
  const translateX = useSharedValue(247);
  const translateY = useSharedValue(275);
  const scaleImage = useSharedValue(imageSize);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -376 }]}>
        {type=="TXT"?<Text style={valProp}>{val}</Text>: <Animated.Image
        source={{ uri: stickerSource }}
        resizeMode="contain"
        style={[imageStyle, { width: imageSize, height: imageSize }]}
      />}
          
      </Animated.View>
    </GestureDetector>
  );
}



// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';

// export default function EmojiSticker({ imageSize, stickerSource }) {
//   const translateX = useSharedValue(247);
//   const translateY = useSharedValue(275);
//   const scaleImage = useSharedValue(imageSize);

//   const imageStyle = useAnimatedStyle(() => {
//     return {
//       width: withSpring(scaleImage.value),
//       height: withSpring(scaleImage.value),
//     };
//   });

//   const doubleTap = Gesture.Tap()
//     .numberOfTaps(2)
//     .onStart(() => {
//       if (scaleImage.value !== imageSize * 2) {
//         scaleImage.value = scaleImage.value * 2;
//       }
//     });

//   const drag = Gesture.Pan()
//     .onChange((event) => {
//       translateX.value += event.changeX;
//       translateY.value += event.changeY;
//     });

//   const containerStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: translateX.value,
//         },
//         {
//           translateY: translateY.value,
//         },
//       ],
//     };
//   });

//   return (
//     <GestureDetector gesture={drag}>
//       <Animated.View style={[containerStyle, { top: -376 }]}>
//         <GestureDetector gesture={doubleTap}>
//           <Animated.Image
//             source={{ uri: stickerSource }}
//             resizeMode="contain"
//             style={[imageStyle, { width: imageSize, height: imageSize }]}
//           />
//         </GestureDetector>
//       </Animated.View>
//     </GestureDetector>
//   );
// }


// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';

// import img from "../assets/images/logo_2.png"

// export default function EmojiSticker({ imageSize }) {
//   const scaleImage = useSharedValue(imageSize);

//   const imageStyle = useAnimatedStyle(() => {
//     return {
//       width: withSpring(scaleImage.value),
//       height: withSpring(scaleImage.value),
//     };
//   });



//   const containerStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: 253,
//         },
//         {
//           translateY: 288,
//         },
//       ],
//     };
//   });

//   return (
//     <Animated.View style={[containerStyle, { top: -350 }]}>
//       <Animated.Image
//         source={img}
//         resizeMode="contain"
//         style={[imageStyle, { width: imageSize, height: imageSize }]}
//       />
//     </Animated.View>
//   );
// }
