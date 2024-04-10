

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

export default function Page() {

  const logoRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);

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
         router.replace("/selection");                    // change
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
      await SecureStore.setItemAsync('wType','Image')
      router.replace("/selection");                                                            // change this too

    } else {
      alert('You did not select any Logo.');
    }

  }

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  return (
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
          <Button theme="primary" label="Text Logo"  onPress={()=>{router.push("/inputText")}} />
        </View>
    );
  };

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
