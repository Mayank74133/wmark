import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { Camera } from 'expo-camera'
import React from 'react';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState('../assets/images/logo_2.png');
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera was denied');
      }
    })();
  }, []);


  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      setSelectedImage(photo.uri);
    }
    setShowAppOptions(true);
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
  };

  const onAddSticker = () => {
    // setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const targetPixelCount = 1080;
  const pixelRatio = pixelRatio.get();
  const pixels = targetPixelCount / pixelRatio;
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: pixels,
        width: pixels,
        quality: 1,
        format: 'png'
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
    onReset();
  };


  return (
    <>
      <GestureHandlerRootView style={styles.container}>

        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            {selectedImage ?
              <ImageViewer
                // ref={imageRef}
                style={styles.imageContainer}
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
              />
              : ''}
            {!selectedImage ? <View style={{
              height: 550,
              width: 350
            }}>
              <Camera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.imageContainer}
                type={cameraType}
              >

                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >


                </View>
              </Camera>
            </View> : ''}
            {pickedEmoji !== null ? (
              <EmojiSticker imageSize={100} />
            ) : null}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 10,
                borderColor: 'white',
                borderRadius: 10,
                borderWidth: 2
              }}
              onPress={toggleCameraType}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>Flip Camera</Text>

            </TouchableOpacity>

            <Button theme="primary" label="Click" onPress={takePicture} />
          </View>
        )}
        {/* <EmojiPicker >
          <EmojiList onSelect={setPickedEmoji} />
        </EmojiPicker> */}
        <StatusBar style="auto" />
      </GestureHandlerRootView>
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
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    gap: 25
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 100
  },
});