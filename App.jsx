import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { Camera } from 'expo-camera'
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import EmojiSticker from './components/EmojiSticker';
const PlaceholderImage = require('./assets/images/logo_2.png');
import * as SecureStore from 'expo-secure-store';
import { Link } from 'expo-router';
import {
  DotIndicator
} from 'react-native-indicators';



export default function App() {

  const [loader, setLoader] = useState(false);
  const [logo, setLogo] = useState(null);
  const logoRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera was denied');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const sessionData = await SecureStore.getItemAsync('sessionData');
      if (sessionData === null) {
        loadLogo();
      } else {
        setPickedEmoji(sessionData);
      }
    })();
  }, [])

  const loadLogo = async () => {
    setPickedEmoji(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {

      setPickedEmoji(result.assets[0].uri.toString());
      logoRef.current = result.assets[0].uri.toString();
      await SecureStore.setItemAsync('sessionData', result.assets[0].uri.toString());

    } else {
      alert('You did not select any Logo.');
    }

  }

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front 
        : Camera.Constants.Type.back
    );
  };

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const takePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    setSelectedImage(result.assets);
    // setSelectedImage1(result.assets[1].uri);
    console.log(selectedImage);
    r
    setLoader(true);

    setTimeout(async () => {
      await onSaveImageAsync();
      setLoader(false);
    }, 3000);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 630,
        width: 350,
        quality: 1,
        format: 'png'
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        // alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
    onReset();
  };



  return (
    <>
      {!pickedEmoji ?
        <View style={{
          marginTop: 350,
        }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 18,
              alignSelf: 'center',
              fontWeight: '600'
            }}
          >Please Upload a Logo </Text>
          <Button theme="primary" label="Upload Logo" onPress={loadLogo} />
          <Link href="/other" asChild>
            <Pressable>
              <Text>Home</Text>
            </Pressable>
          </Link>
        </View>
        : ''

      }
      {pickedEmoji ? <GestureHandlerRootView style={styles.container}>

        <View style={styles.imageContainer}>

          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              // ref={imageRef}
              style={styles.imageContainer}
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {!selectedImage ? <View style={{
              height: 630,
              width: 350
            }}>
              <Camera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.imageContainer}
                type={cameraType}
              >
              </Camera>
            </View> : ''}
            {pickedEmoji !== null ? (
              <EmojiSticker imageSize={100} stickerSource={pickedEmoji} />
            ) : null}
          </View>



        </View>


        {!loader ?

          <View style={styles.footerContainer} >
            <View>
              <Button theme="primary" label="Click" onPress={takePicture} />
            </View>
            <View style={styles.footerContainer2}>
              <Button label="Reset Logo" onPress={loadLogo} />
              <Button label="Toggle Camera" onPress={toggleCameraType} />
            </View>
          </View> :
          <View style={{ backgroundColor: 'white', height: 100, marginTop: 250, marginBottom: 50 }}>
            <DotIndicator color="#00ff12" style={{ backgroundColor: '#26282c' }} />
          </View>
        }

      </GestureHandlerRootView > : ''
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 40
  },
  footerContainer: {
    paddingTop: 200,
    flex: 1 / 3,
    alignItems: 'center',
  },
  footerContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});



