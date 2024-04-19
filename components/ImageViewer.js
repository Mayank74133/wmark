import { Image } from 'expo-image';
import { useEffect ,useState } from 'react';
import { Dimensions } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const [wwidth, setWwidth] = useState(0);
  const [wheight, setWheight] = useState(0);

  useEffect(() => {
    setWwidth(Dimensions.get("window").width - 20);
    setWheight(Dimensions.get("window").height - 200);
  }, []);

  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={{width:wwidth,height:wheight}} />;
}

