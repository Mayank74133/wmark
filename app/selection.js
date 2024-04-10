import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View,  Text, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { Camera } from 'expo-camera'
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import * as SecureStore from 'expo-secure-store';
import { Link, router } from "expo-router";


export default function App() {

  const [loader, setLoader] = useState(false);
  const [logo, setLogo] = useState(null);
  const logoRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
  // useEffect(() => {
  //   loadLogo();
  // }, []);


  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync()
      setSelectedImage(photo.uri);
    }
    setLoader(true);

    setTimeout(async () => {
      await onSaveImageAsync();
      setLoader(false);
    }, 3000);
    // setShowAppOptions(true);
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

  const handleChange=()=>{
    router.push("/imageSelector")
    console.log("Pressed hua h ");
    
  }

  return (
        <View style={{
          marginTop: 250,
        }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 18,
              alignSelf: 'center',
              fontWeight: '600'
            }}
          >Select a Method  </Text>
          <Link href="/imageSelector" asChild>
          <Pressable  >
          <Text style={styles.item}>Select Image</Text> 
          </Pressable>
        </Link>

          <Link href="/captureImage" asChild>
            <Pressable >
            <Text style={styles.item}>Capture Image</Text> 

            </Pressable>
          </Link>

        </View>
      
    );
  }

const styles = StyleSheet.create({
  item:{
    width:'100vw',
    // backgroundColor:'green',
    borderColor:'#e3b100',
    textAlign:'center',
    // color:'white',
    fontSize:20,
    paddingVertical:12,
    marginVertical:4,
    marginHorizontal:50,
    borderWidth:4,
    borderRadius:15
  },
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


